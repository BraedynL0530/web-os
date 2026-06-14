import { useState } from 'react';
import Background from './background';
import TopBar from './TopBar';
import WindowManager from './WindowManger.jsx';
import AppBar from './AppBar';
//import '../css/Desktop.css';

function Desktop() {

    const apps = useState([
        {id:"filler" , name:"filler" , componet:filler, icon:"filler"} // add later
    ]);

    const launch = (app) => {// dunno how this will work yet
        console.log(`Launching ${app.name}`);
    }

    return (

        <div className="desktop">
            <Background />
            <TopBar />
            <WindowManager />
            <AppBar apps={apps}/>
        </div>

    );
}

export default Desktop;