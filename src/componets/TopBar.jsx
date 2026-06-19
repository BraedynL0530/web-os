//ToDO: finish settings and music
import { useState, useEffect } from 'react';
import {weather} from '../api/api.js'
import '../css/TopBar.css'
function TopBar() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
    const interval = setInterval(() => {
        setWeatherData(weather.getWeather());
    }, 600000);

    setWeatherData(weather.getWeather());

    return () => clearInterval(interval);
}, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    })
    return (
        <>
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

                </div>

            <div className="drop-bar">
                <div className="music-contrainer">
                    <div className="music-info"></div>
                    <div className="record-gif"></div>
                    <div className="music-controls">
                        <div className="prev-btn">⏮️</div>
                        <div className="play-btn">▶️</div>
                        <div className="next-btn">⏭️</div>
                        <div className="add-song">
                            <input className="song-input" placeholder="youtube url here" />
                            <button className="add-btn">Add</button>
                        </div>
                    </div>
                    <div className="music-gif"></div>
                </div>
                <div className="notification">
                    <div className="notif-title">NebulaOS</div>
                    <div className="notif-body">star this project ⭐</div>
                     <div className="notif-title">NebulaOS</div>
                    <div className="notif-body">please TwT</div>
                </div>
            </div>
        </>
    )
}

export default TopBar
