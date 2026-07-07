
const formatDuration = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const extractVideoId = (input = "") => {
  const text = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(text)) return text;

  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const p of patterns) {
    const m = text.match(p);
    if (m?.[1]) return m[1];
  }

  try {
    const u = new URL(text);
    const v = u.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
  } catch (_) {}

  return null;
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
export const music = { // backend is isnt gonna work im gonna do invisible i frames with youtube!
    player: null,
  onEndedCallback: null,

  init(player) {
    this.player = player;
  },

  onEnded(cb) {
    this.onEndedCallback = cb;
    return () => {
      if (this.onEndedCallback === cb) this.onEndedCallback = null;
    };
  },

  handlePlayerStateChange(event) {
    if (!window.YT) return;
    if (event.data === window.YT.PlayerState.ENDED) {
      this.onEndedCallback?.();
    }
  },

  async getMusic() {
    const saved = localStorage.getItem("url_playlist");
    let urls = [];
    try {
      const parsed = JSON.parse(saved);
      urls = Array.isArray(parsed) ? parsed : [];
    } catch {
      urls = [];
    }

    return urls
    .map((url) => {
      const videoId = extractVideoId(url);
      return {
        id: videoId || url,
        rawUrl: url,
        videoId,
        title: videoId ? `YouTube ${videoId}` : "Invalid URL",
        song: videoId ? `YouTube ${videoId}` : "Invalid URL",
        artist: "YouTube",
        duration: "—",
      };
    })
    .filter((x) => !!x.videoId);
  },

  async addMusic(url) {
    const trimmed = (url || "").trim();
    const videoId = extractVideoId(trimmed);
    if (!videoId) return this.getMusic();

    const current = await this.getMusic();
    const nextUrls = current.map((x) => x.rawUrl);
    nextUrls.push(trimmed);

    localStorage.setItem("url_playlist", JSON.stringify(nextUrls));
    return this.getMusic();
  },

  play(videoId) {
    if (!this.player || !videoId) return;
    this.player.loadVideoById(videoId);
  },

  pause() {
    if (!this.player) return;
    this.player.pauseVideo();
  },

  resume() {
    if (!this.player) return;
    this.player.playVideo();
  },

  isPaused() {
    if (!this.player || !window.YT) return true;
    return this.player.getPlayerState() !== window.YT.PlayerState.PLAYING;
  },
};

