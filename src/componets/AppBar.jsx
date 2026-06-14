//import '../css/AppBar.css'

function AppBar({apps,onLaunchApp}) {
const launchApp = (app) => {
     onLaunchApp(app);
}
    return (
        <div className="app-bar">
            {apps.slice(0, 4).map(app => (
                <button key={`${app.id}-${app.name}`}className="app-icon" onClick={() => launchApp(app)}>{app.icon}</button>
            ))}
            <div className="app-bar-spacer"></div>
            <div className="app-search">Search Apps 🔎︎</div>
        </div>
    )
}

export default AppBar;