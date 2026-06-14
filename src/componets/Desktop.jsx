import { useState } from 'react';
import Background from './background';
import TopBar from './TopBar';
import WindowManager from './WindowManger.jsx';
import AppBar from './AppBar';

function Desktop() {
    const [apps] = useState([
        { id: "filler", name: "filler", component: null, icon: "filler" }
    ]);

    const [wmRef, setWmRef] = useState(null);

    return (
        <div className="desktop">
            <Background />
            <TopBar />

            <WindowManager ref={setWmRef} />

            <AppBar
                apps={apps}
                onLaunchApp={(app) => wmRef?.openWindow(app)}
            />
        </div>
    );
}

export default Desktop;