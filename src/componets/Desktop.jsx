import { useRef, useState } from "react";
import Background from './background';
import TopBar from './TopBar';
import WindowManager from './WindowManger.jsx';
import AppBar from './AppBar';
import Whiteboard   from "./apps/whiteboard.jsx";
import '../css/Desktop.css'
import Snake from "./apps/snake.jsx";
import Calc from "./apps/calc.jsx";

function Desktop() {
    const [apps] = useState([
        { id: crypto.randomUUID(), name: "Drawing",title:"Drawing", component: Whiteboard, icon: "Drawing"},
        { id: crypto.randomUUID(), name: "Calc",title:"Calc(if your new calc is short for calculator)", component: Calc, icon: "Calc" },
        { id: crypto.randomUUID(), name: "Snake",title:"Snake", component: Snake, icon: "Snake" },
        { id: crypto.randomUUID(), name: "Terminal",title:"Terminal", component: Whiteboard, icon: "Terminal" }
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