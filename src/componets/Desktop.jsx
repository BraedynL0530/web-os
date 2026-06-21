import { useRef, useState } from "react";
import TopBar from './TopBar';
import WindowManager from './WindowManger.jsx';
import AppBar from './AppBar';
import Whiteboard   from "./apps/whiteboard.jsx";
import '../css/Desktop.css'
import Snake from "./apps/snake.jsx";
import Calc from "./apps/calc.jsx";
import Terminal from "./apps/Terminal.jsx";
import Notes from "./apps/Notes.jsx";
import pillars from "../assets/pillarsOfCreation.jpg";
import Ring from "../assets/southernRing.jpg";
import Black from "../assets/black.jpg";
function Desktop() {
    const [apps] = useState([
        { id: crypto.randomUUID(), name: "Drawing",title:"Drawing", component: Whiteboard, icon: "Drawing"},
        { id: crypto.randomUUID(), name: "Calc",title:"Calc(if your new calc is short for calculator)", component: Calc, icon: "Calc" },
        { id: crypto.randomUUID(), name: "Snake",title:"Snake", component: Snake, icon: "Snake" },
        { id: crypto.randomUUID(), name: "Terminal",title:"Terminal", component: Terminal, icon: "Terminal" },
        { id: crypto.randomUUID(), name: "Notes",title:"Notes", component: Notes, icon: "Notes" }
    ]);

    const [backgrounds] = useState([
        {id:1,name:"Southern Ring", image:Ring},
        {id:2,name:"Pillars of Creation", image:pillars},
        {id:3,name:"Black", image:Black},
    ]);
    const [currentBg, setCurrentBg] = useState(backgrounds[0]);

    const wmRef = useRef(null);

    return (
        <div
        className="desktop"
        style={{
            backgroundImage: `url(${currentBg.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>

            <TopBar backgrounds={backgrounds} setBackground={setCurrentBg}/>

            <WindowManager ref={wmRef} />

            <AppBar
                apps={apps}
                onLaunchApp={(app) => wmRef.current?.openWindow(app)}
            />
        </div>
    );
}

export default Desktop;