import { useState } from "react";
import '../css/AppBar.css';

function AppBar({ apps, onLaunchApp }) {
    const [search, setSearch] = useState("");

    const launchApp = (app) => {
        onLaunchApp(app);
        setSearch("");
    };

    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="app-bar">
            {apps.slice(0, 4).map(app => (
                <button
                    key={`${app.id}-${app.name}`}
                    className="app-icon"
                    onClick={() => launchApp(app)}
                >
                    {app.icon}
                </button>
            ))}

            <div className="app-bar-spacer"></div>

            <div className="search-container">
                <input
                    className="app-search"
                    placeholder="Search Apps 🔎︎"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {search && (
                    <div className="search-results">
                        {filteredApps.length > 0 ? (
                            filteredApps.map(app => (
                                <div
                                    key={app.id}
                                    className="search-result"
                                    onClick={() => launchApp(app)}
                                >
                                    {app.icon} {app.name}
                                </div>
                            ))
                        ) : (
                            <div className="search-result">
                                No apps found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppBar;