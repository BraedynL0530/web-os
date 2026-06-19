const BACKEND_URL = 'http://localhost:8000'; // note to me change this on prod

export const weather = {
    async getWeather() {
        try {
            const ipRes = await fetch('https://ipapi.co'); //doesnt work if they have privacy features like fixfox for me
            const ipData = await ipRes.json();
            const { latitude, longitude, city } = ipData;

            const weatherUrl = `https://open-meteo.com{latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`;
            const weatherRes = await fetch(weatherUrl);
            const weatherData = await weatherRes.json();

            const tempF = weatherData.current.temperature_2m;

            // Returns something like "72°F (New York)"
            return `${Math.round(tempF)}°F (${city})`;
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
            return "N/A check privacy settings";
        }
    }
};

export const music = {
    getMusic() {
        const savedTracks = localStorage.getItem('url_playlist');
        const urls = savedTracks ? JSON.parse(savedTracks) : [];

        return urls.map((url, index) => ({
            id: index,
            artist: "YouTube Video",
            song: `Song #${index + 1}`,
            rawUrl: url,
            file: `${BACKEND_URL}/stream-song?url=${encodeURIComponent(url)}`
        }));
    },

    addMusic(newUrl) {
        if (!newUrl) return this.getMusic();

        const savedTracks = localStorage.getItem('url_playlist');
        const urls = savedTracks ? JSON.parse(savedTracks) : [];

        urls.push(newUrl);
        localStorage.setItem('url_playlist', JSON.stringify(urls));

        return this.getMusic();
    },
};

