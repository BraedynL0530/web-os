// this is going to be "launcher" now, opens and manages each window,
import { useState } from "react";
import Window from "./Window";

function WindowManager() {
    const [windows, setWindows] = useState([]);

    const openWindow = (app) => {
        setWindows(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                title: app.title,
                component: app.component,
                x: 100,
                y: 100,
                width: 600,
                height: 400,
                minimized: false,
                maximized: false,
                zIndex: prev.length + 1
            }
        ]);
    };
    const closeWindow = (id) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    };

    const minimizeWindow = (id) => {
        setWindows(prev =>
            prev.map(w =>
                w.id === id
                    ? { ...w, minimized: !w.minimized }
                    : w
            )
        );
    };

    const maximizeWindow = (id) => {
        setWindows(prev =>
            prev.map(w =>
                w.id === id
                    ? { ...w, maximized: !w.maximized }
                    : w
            )
        );
    };

    const focusWindow = (id) => {
        const highest =
            Math.max(...windows.map(w => w.zIndex), 0) + 1;

        setWindows(prev =>
            prev.map(w =>
                w.id === id
                    ? { ...w, zIndex: highest }
                    : w
            )
        );
    };

    return (
        <>
            {windows.map(window => (
                <Window
                    key={window.id}
                    window={window}
                    onClose={() => closeWindow(window.id)}
                    onMinimize={() => minimizeWindow(window.id)}
                    onMaximize={() => maximizeWindow(window.id)}
                    onFocus={() => focusWindow(window.id)}
                />
            ))}
        </>
    );
}

export default WindowManager;
