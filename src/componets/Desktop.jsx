import { useRef, useState } from "react";
import Background from './background';
import TopBar from './TopBar';
import WindowManager from './WindowManger.jsx';
import AppBar from './AppBar';
import Whiteboard   from "./apps/whiteboard.jsx";
import '../css/Desktop.css'

function Desktop() {
    const [apps] = useState([
        { id: crypto.randomUUID(), name: "Drawing",title:"Drawing", component: Whiteboard, icon: "filler" }
    ]);

    const wmRef = useRef(null);

    return (
        <div className="desktop">

            <TopBar />

            <WindowManager ref={wmRef} />

            <AppBar
                apps={apps}
                onLaunchApp={(app) => wmRef.current?.openWindow(app)}
            />
        </div>
    );
}

export default Desktop;