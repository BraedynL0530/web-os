//ToDo: plug in weather api
const BACKEND_URL = 'http://localhost:8000';

const weather = [
    function getWeather() {
        return "99F" // mock data
    }
]

const music = [
    function getMusic() {
        const savedTracks = localStorage.getItem('url_playlist');
        const urls = savedTracks ? JSON.parse(savedTracks) : [];

        return urls.map((url, index) => {
            return {
                id: index,
                artist: "YouTube Video",
                song: `Song # ${index + 1}`,
                rawUrl: url,
                file: `${BACKEND_URL}/stream-song?url=${encodeURIComponent(url)}`
            };
        });
    },

-    function addMusic(newUrl) {
        if (!newUrl) return;
        const savedTracks = localStorage.getItem('url_playlist');
        const urls = savedTracks ? JSON.parse(savedTracks) : [];

        urls.push(newUrl);
        localStorage.setItem('url_playlist', JSON.stringify(urls));
        return this.getMusic();
    },

-    function deleteMusic(indexToRemove) {
        const savedTracks = localStorage.getItem('url_playlist');
        if (!savedTracks) return [];

        let urls = JSON.parse(savedTracks);
        urls = urls.filter((_, index) => index !== indexToRemove);

        localStorage.setItem('url_playlist', JSON.stringify(urls));
        return this.getMusic();
    }
]

export default {weather, music}