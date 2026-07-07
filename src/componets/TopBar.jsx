import { useState, useEffect, useRef } from "react";
import { weather, music } from "../api/api.js";
import "../css/TopBar.css";
import recordGif from "../assets/record-spinning.gif";
import bongoCat from "../assets/bongocat.gif";

function TopBar({ backgrounds, setBackground }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [weatherData, setWeatherData] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const safePlaylist = Array.isArray(playlist) ? playlist : [];

  const ytReadyRef = useRef(false);
  const playlistRef = useRef([]);
  const currentIndexRef = useRef(-1);

  useEffect(() => {
    playlistRef.current = safePlaylist;
  }, [safePlaylist]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const unsubscribe = music.onEnded(() => {
      const tracks = playlistRef.current || [];
      if (!tracks.length) return;

      const i = currentIndexRef.current;
      const next = ((i >= 0 ? i : 0) + 1) % tracks.length;
      void playSong(next, tracks);
    });

    return () => unsubscribe?.();
  }, []);

  useEffect(() => {
    const existing = document.getElementById("youtube-iframe-api");
    if (!existing) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (ytReadyRef.current) return;

      const player = new window.YT.Player("youtube-player", {
        width: "1",
        height: "1",
        videoId: "",
        playerVars: { autoplay: 0, controls: 0, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => {
            ytReadyRef.current = true;
            music.init(player);
          },
          onStateChange: (event) => {
            music.handlePlayerStateChange(event);
          },
        },
      });

      if (typeof prev === "function") prev();
    };

    return () => {
      window.onYouTubeIframeAPIReady = prev || null;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadWeather = async () => {
      const result = await weather.getWeather();
      if (!cancelled) {
        setWeatherData(result);
      }
    };

    loadWeather();

    const interval = setInterval(() => {
      loadWeather();
    }, 600000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadMusic = async () => {
      const tracks = await music.getMusic();
      if (!cancelled) {
        setPlaylist(Array.isArray(tracks) ? tracks : []);
      }
    };

    loadMusic();

    return () => {
      cancelled = true;
    };
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = music.onEnded(() => {
      if (!safePlaylist.length) return;
      const next = (currentIndex + 1) % safePlaylist.length;
      void playSong(next, safePlaylist);
    });

    return () => unsubscribe?.();
  }, [currentIndex, safePlaylist]);

  const handleAddSong = async () => {
     const input = document.querySelector(".song-input");
    if (!input || !input.value.trim()) return;

    const updated = await music.addMusic(input.value);
    const newPlaylist = Array.isArray(updated) ? updated : [];

    setPlaylist(newPlaylist);

    const newestIndex = newPlaylist.length - 1;

    const track = newPlaylist[newestIndex];
    if (track?.videoId) {
      music.play(track.videoId);
      setCurrentIndex(newestIndex);
    }

    input.value = "";
  };

  const playSong = async (index, tracks = safePlaylist) => {
    const track = tracks[index];
    if (!track?.videoId) return;

    music.play(track.videoId);
    setCurrentIndex(index);
  };


  const togglePlayback = async () => {
      music.isPaused() ? music.resume() : music.pause();
    };

  const nextSong = () => {
       if (!safePlaylist.length) return;
       const next = (currentIndex + 1) % safePlaylist.length;
       void playSong(next, safePlaylist);
    };

  const prevSong = () => {
      if (!safePlaylist.length) return;
      const prev = (currentIndex - 1 + safePlaylist.length) % safePlaylist.length;
      void playSong(prev, safePlaylist);
    };


  const toggleDropdown = () => {
    setSettingsOpen((prev) => !prev);
  };
  return (
    <div className="top-wrapper">
      <div
        id="youtube-player"
        style={{
          width: "1px",
          height: "1px",
          position: "absolute",
          left: "-9999px"
        }}
      />

      <div className="top-bar">
        <button className="settings-btn" onClick={toggleDropdown}>☰ Nebula</button>
        <div className="center">
          <div className="center-title">NebulaOS</div>
          <div className="center-subtext">▾ Quick panel</div>
        </div>

        <div className="top-right">
          <div className="clock">{time}</div>
          <div className="weather">Temp:{weatherData}</div>
          <div className="network">🌐</div>
        </div>
      </div>

      <div className={`settings-dropdown ${settingsOpen ? "open" : ""}`}>
        <div className="left-side">
          <img src={bongoCat} alt="bongo cat" className="bongo-cat" />
        </div>
        <div className="os-info">NebulaOs v0.1</div>
        <div className="about-me-menu">
          <div className="about-me-title">About Me!</div>
          <div className="about-me-body">
            hi im me and this is my about me section
          </div>
        </div>
        <div className="backgrounds-dropdown"> Backgrounds▶
          <div className="backgrounds">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              className="background-item"
              onClick={() => setBackground(bg)}
              style={{
                backgroundImage: `url(${bg.image})`,
                backgroundSize: "cover"
              }}
            >
              {bg.name}
            </button>
          ))}
          </div>
        </div>
      </div>

      <div className="drop-bar">
        <div className="music-contrainer">
          <div className="music-info">
            {safePlaylist.map((track, index) => (
              <div
                key={`${track.rawUrl || track.title || "song"}-${index}`}
                onClick={() => playSong(index)}
              >
                {track.song || track.title || "Untitled song"}
              </div>
            ))}
          </div>

          <div className="record-gif">
            <img src={recordGif} alt="record" />
          </div>

          <p className="diclamer">
            this may take a while everytime you add a new song or go forward/back or refresh
          </p>

          <div className="music-controls">
              <div className="transport-controls">
                <button className="prev-btn" onClick={prevSong}>⏮️</button>
                <button className="play-btn" onClick={() => void togglePlayback()}>▶️</button>
                <button className="next-btn" onClick={nextSong}>⏭️</button>
              </div>

            <div className="add-song">
              <input className="song-input" placeholder="music (youtube) url here" />
              <button className="add-btn" onClick={handleAddSong}>Add</button>
            </div>
          </div>
        </div>

        <div className="notification">
          <div className="notif-header">notifications</div>
          <div className="notif-title">NebulaOS</div>
          <div className="notif-body">Snake is buggy</div>
          <div className="notif-title">NebulaOS</div>
          <div className="notif-body">star this project ⭐ please TwT</div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
