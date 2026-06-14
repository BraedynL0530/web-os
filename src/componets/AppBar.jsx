//import '../css/AppBar.css'
import WindowManager from "./WindowManger.jsx"; // schrodinger's spelling

function AppBar(apps) {
    const windows = WindowManager();
const launchApp = (app) => {
     windows.openWindow(app);
}
    return (
        <div className="app-bar">
            {apps.apps.slice(0, 4).map(app => (
                <button className="app-icon" onClick={() => launchApp(app)}>{app.icon}</button>
            ))}
            <div className="app-bar-spacer"></div>
            <div className="app-search">Search Apps 🔎︎</div>
        </div>
    )
}

export default AppBar;