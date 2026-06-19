import { useRef, useState } from "react";
import Background from './background';
import TopBar from './TopBar';
import WindowManager from './WindowManger.jsx';
import AppBar from './AppBar';
import Whiteboard   from "./apps/whiteboard.jsx";
import '../css/Desktop.css'

function Desktop() {
    const [apps] = useState([
        { id: crypto.randomUUID(), name: "Drawing",title:"Drawing", component: Whiteboard, icon: "Drawing"},
        { id: crypto.randomUUID(), name: "test1",title:"test1", component: Whiteboard, icon: "test1" },
        { id: crypto.randomUUID(), name: "test2",title:"test2", component: Whiteboard, icon: "test2" },
        { id: crypto.randomUUID(), name: "test3",title:"test3", component: Whiteboard, icon: "test3" },
        { id: crypto.randomUUID(), name: "test4",title:"test4", component: Whiteboard, icon: "test4" }
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