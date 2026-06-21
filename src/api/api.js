const BACKEND_URL = 'http://127.0.0.1:8000'; // note to me change this on prod

const formatDuration = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const weather = {
  async getWeather() {
    try {
      const ipRes = await fetch("https://ipapi.co/json/");
      if (!ipRes.ok) {
        throw new Error(`IP lookup failed: ${ipRes.status}`);
      }

      const ipData = await ipRes.json();
      const { latitude, longitude} = ipData;

      const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`;

      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) {
        throw new Error(`Weather lookup failed: ${weatherRes.status}`);
      }

      const weatherData = await weatherRes.json();
      const tempF = weatherData.current?.temperature_2m;

      if (typeof tempF !== "number") {
        throw new Error("No temperature returned");
      }

      return `${Math.round(tempF)}°F`;
    } catch (error) {
      console.error("Weather fetch failed:", error);
      return `N/A (${error.message})`;
    }
  }
};
export const music = {
  async getMusic() {
    const savedTracks = localStorage.getItem("url_playlist");

    let urls = [];
    try {
      const parsed = savedTracks ? JSON.parse(savedTracks) : [];
      urls = Array.isArray(parsed) ? parsed : [];
    } catch {
      urls = [];
    }

    const tracks = [];

    for (const url of urls) {
      if (!url) continue;

      try {
        const res = await fetch(
          `${BACKEND_URL}/stream-song?url=${encodeURIComponent(url)}&meta=1`
        );
        const data = await res.json();

        tracks.push({
          id: tracks.length,
          artist: "YouTube Video",
          song: data.title || "Unknown Title",
          title: data.title || "Unknown Title",
          duration: formatDuration(data.duration),
          rawUrl: url,
          file: `${BACKEND_URL}/stream-song?url=${encodeURIComponent(url)}`
        });
      } catch (error) {
        console.error("Failed to load track:", error);
      }
    }

    return tracks;
  },

  async addMusic(newUrl) {
    if (!newUrl) return this.getMusic();

    const savedTracks = localStorage.getItem("url_playlist");

    let urls = [];
    try {
      const parsed = savedTracks ? JSON.parse(savedTracks) : [];
      urls = Array.isArray(parsed) ? parsed : [];
    } catch {
      urls = [];
    }

    urls.push(newUrl);
    localStorage.setItem("url_playlist", JSON.stringify(urls));

    return this.getMusic();
  }
};

