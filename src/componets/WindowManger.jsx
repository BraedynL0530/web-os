// this is going to be "launcher" now, opens and manages each window,
import { useState, forwardRef, useImperativeHandle } from "react";
import Window from "./Window";

//tiling will be post ship

const WindowManager = forwardRef((props, ref) => {
    const [windows, setWindows] = useState([]);

    const openWindow = (app) => {
        setWindows(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                title: app.title,
                icon: app.icon,
                component: app.component,
                x: 100,
                y: 100,
                width: 600,
                height: 400,
                minimized: false,
                maximized: false,
                zIndex: prev.length + 1,
                snapped: false,
                prevBounds: null
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
        prev.map(w => {
            if (w.id !== id) return w;

            if (!w.maximized) {
                return {
                    ...w,
                    prevBounds: {
                        x: w.x,
                        y: w.y,
                        width: w.width,
                        height: w.height
                    },
                    x: 0,
                    y: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    maximized: true
                };
            }

            return {
                ...w,
                x: w.prevBounds?.x ?? w.x,
                y: w.prevBounds?.y ?? w.y,
                width: w.prevBounds?.width ?? w.width,
                height: w.prevBounds?.height ?? w.height,
                maximized: false,
                prevBounds: null
            };
        })
    );
};

    const focusWindow = (id) => {
        const highest = Math.max(...windows.map(w => w.zIndex), 0) + 1;

        setWindows(prev =>
            prev.map(w =>
                w.id === id
                    ? { ...w, zIndex: highest }
                    : w
            )
        );
    };

    const moveWindow = (id, pos) => {
    setWindows(prev =>
        prev.map(w =>
            w.id === id ? { ...w, ...pos } : w
        )
    );
};

    //const tiling aka snap=

    useImperativeHandle(ref, () => ({
        openWindow
    }));

    return (
        <>
            {windows.map(window => (
                !window.minimized && (
                    <Window
                        key={window.id}
                        window={window}
                        onClose={() => closeWindow(window.id)}
                        onMinimize={() => minimizeWindow(window.id)}
                        onMaximize={() => maximizeWindow(window.id)}
                        onFocus={() => focusWindow(window.id)}
                        onMove={(pos) => moveWindow(window.id, pos)}
                    />
                )
            ))}
        </>
    );
});

export default WindowManager;
