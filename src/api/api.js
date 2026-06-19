const BACKEND_URL = 'http://localhost:8000';

export const weather = {
    getWeather() {
        return "99F"; // ToDo: plug into real api
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

    deleteMusic(indexToRemove) {
        const savedTracks = localStorage.getItem('url_playlist');
        if (!savedTracks) return [];

        let urls = JSON.parse(savedTracks);
        urls = urls.filter((_, index) => index !== indexToRemove);

        localStorage.setItem('url_playlist', JSON.stringify(urls));

        return this.getMusic();
    }
};

