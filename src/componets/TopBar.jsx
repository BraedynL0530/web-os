import { useState, useEffect } from 'react';
import  weather from '../api/api.js'
function TopBar() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {{
    const interval = setInterval(() => {
            setWeatherData(weather.getWeather());
        }, 600000);
        return () => clearInterval(interval);}
    })

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
                <div className="clock">{time}</div>
                <div className="weather">{weatherData}</div>
                <div className="network">🌐</div>
            </div>

            <div className="settings-menu">

                </div>

            <div className="drop-bar">

                </div>
        </>
    )
}

export default TopBar
