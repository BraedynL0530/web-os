import { useState } from 'react';
import Background from './Background';
import TopBar from './TopBar';
import WindowManager from './WindowManager';
import AppBar from './AppBar';
import '../css/Desktop.css';

function Desktop() {

    const apps = useState([
        {id:"filler" , name:"filler" , icon:"filler"}
    ]);

    const launch = (app) => {// dunno how this will work yet
        console.log(`Launching ${app.name}`);
    }

    return (
        <div className="desktop">
            <Background />
            <TopBar />
            <WindowManager />
            <AppBar />
        </div>
    );
}

export default Desktop;