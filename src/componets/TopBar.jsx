//ToDO: finish settings
import { useState, useEffect, useRef } from 'react';
import {weather, music} from '../api/api.js'
import '../css/TopBar.css'
function TopBar() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [weatherData, setWeatherData] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const audioRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setWeatherData(weather.getWeather());
    }, 600000);

    setWeatherData(weather.getWeather());

    return () => clearInterval(interval);
}, []);
        useEffect(() => {
        setPlaylist(music.getMusic());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleAddSong = () => {
        const input = document.querySelector('.song-input');
        const updated = music.addMusic(input.value);

        setPlaylist(updated);
        input.value = '';
    };
    const playSong = (index) => {
        const track = playlist[index];
        if (!track) return;

        audioRef.current.src = track.file;
        audioRef.current.play();
        setCurrentIndex(index);
    };
    const nextSong = () => {
        if (!playlist.length) return;
        const next = (currentIndex + 1) % playlist.length;
        playSong(next);
    };

    const prevSong = () => {
        if (!playlist.length) return;
        const prev = (currentIndex - 1 + playlist.length) % playlist.length;
        playSong(prev);
    };
    return (
        <>
            <div className="top-wrapper">
                <audio ref={audioRef} />
            <div className="top-bar">
                <div className="settings-btn">☰ Nebula</div>
                <div className="center">NebulaOS</div>

                <div className="top-right">
                    <div className="clock">{time}</div>
                    <div className="weather">Temp:{weatherData}</div>
                    <div className="network">🌐</div>
                </div>
            </div>

            <div className="settings-dropdown">
                <div className="os-info">NebulaOs v0.1</div>
                <div className="about me"></div>
                <div className="backgrounds"></div>
                </div>

            <div className="drop-bar">
                <div className="music-contrainer">
                    <div className="music-info">
                        {playlist.map((track, index) => (
                            <div
                                key={track.rawUrl}
                                onClick={() => playSong(index)}
                            >
                                {track.song}
                            </div>
                        ))}
                    </div>
                    <div className="record-gif"></div>
                    <p className="diclamer">this may take a while everytime you add a new song or go forward/back or refresh</p>
                    <div className="music-controls">
                        <button className="prev-btn" onClick={prevSong}>⏮️</button>
                        <button
                          className="play-btn"
                          onClick={() => {
                            const audio = audioRef.current;
                            if (!audio) return;

                            if (audio.paused) {
                              audio.play();
                            } else {
                              audio.pause();
                            }
                          }}
                        >
                          ▶️
                        </button>
                        <button className="next-btn"onClick={nextSong}>⏭️</button>
                        <div className="add-song">
                            <input className="song-input" placeholder="music(youtube) url here"/>
                            <button className="add-btn"onClick={handleAddSong}>Add</button>
                        </div>
                    </div>
                </div>
                    <div className="music-gif"></div>
                <div className="notification">
                    <div className="notif-title">NebulaOS</div>
                    <div className="notif-body">star this project ⭐</div>
                     <div className="notif-title">NebulaOS</div>
                    <div className="notif-body">please TwT</div>
                </div>
            </div>
            </div>
        </>
    )
}

export default TopBar
