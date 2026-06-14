//import '../css/AppBar.css'

function AppBar(apps) {

    return (
        <div className="app-bar">
            {apps.apps.slice(0, 4).map(app => (
                <div className="app-icon" key={app.id}>
                    {app.icon}
                </div>
            ))}
            <div className="app-bar-spacer"></div>
            <div className="app-search"></div>
        </div>
    )
}

export default AppBar;