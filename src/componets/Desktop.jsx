import { useState } from 'react';
import Background from './Background';
import TopBar from './TopBar';
import WindowManager from './WindowManager';
import AppLauncher from './AppLauncher';
import '../css/Desktop.css';

function Desktop() {

    const apps = useState([
        {id:"filler" , name:"filler" , icon:"filler"}
    ]);

    const lunchApp = (app) => {// dunno how this will work yet
        console.log(`Launching ${app.name}`);
    }

    return (
        <div className="desktop">
            <Background />
            <TopBar />
            <WindowManager />
            <AppLauncher apps={apps} />
        </div>
    );
}

export default Desktop;