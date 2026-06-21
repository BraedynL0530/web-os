import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import Window from "./Window";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const TITLE_BAR_HEIGHT = 40;
const BORDER = 2;
const CONTENT_PADDING = 12;
const TOP_BAR_HEIGHT = 40;


const getContentViewport = (w) => ({
  width: Math.max(240, w.width - BORDER * 2 - CONTENT_PADDING * 2),
  height: Math.max(180, w.height - TITLE_BAR_HEIGHT - BORDER * 2 - CONTENT_PADDING * 2)
});

const checkSnap = (x, y, width, height) => {
  const threshold = 50;
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  if (x < threshold)
    return { x: 0, y: TOP_BAR_HEIGHT, width: screenW / 2, height: screenH - TOP_BAR_HEIGHT };

  if (x + width > screenW - threshold)
    return { x: screenW / 2, y: TOP_BAR_HEIGHT, width: screenW / 2, height: screenH - TOP_BAR_HEIGHT };

  return null;
};

const WindowManager = forwardRef((props, ref) => {
  const [windows, setWindows] = useState([]);

  const updateWindow = (id, updater) => {
    setWindows(prev => prev.map(w => (w.id === id ? updater(w) : w)));
  };

  const openWindow = (app) => {
    const width = clamp(Math.round(window.innerWidth * 0.7), 320, 900);
    const height = clamp(Math.round(window.innerHeight * 0.7), 240, 700);

    setWindows(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: app.title,
        icon: app.icon,
        component: app.component,
        x: 60 + prev.length * 20,
        y: 50 + prev.length * 20,
        width,
        height,
        minimized: false,
        maximized: false,
        zIndex: prev.length + 1,
        prevBounds: null
      }
    ]);
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    updateWindow(id, w => ({ ...w, minimized: !w.minimized }));
  };

  const maximizeWindow = (id) => {
    updateWindow(id, w => {
      if (w.maximized) {
        return {
          ...w,
          x: w.prevBounds?.x ?? w.x,
          y: w.prevBounds?.y ?? w.y,
          width: w.prevBounds?.width ?? w.width,
          height: w.prevBounds?.height ?? w.height,
          maximized: false,
          prevBounds: null
        };
      }

      return {
          ...w,
          prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
          x: 0,
          y: TOP_BAR_HEIGHT,
          width: window.innerWidth,
          height: window.innerHeight - TOP_BAR_HEIGHT,
          maximized: true
        };
    });
  };

  const focusWindow = (id) => {
    const highest = Math.max(...windows.map(w => w.zIndex), 0) + 1;
    updateWindow(id, w => ({ ...w, zIndex: highest }));
  };

  const moveWindow = (id, pos) => {
  updateWindow(id, w => {
    const nextState = { ...w, ...pos };
    const snapped = checkSnap(nextState.x, nextState.y, nextState.width, nextState.height);
    return snapped ? { ...nextState, ...snapped } : nextState;
  });
};

  const resizeWindow = (id, next) => {
    updateWindow(id, w => ({
      ...w,
      width: clamp(next.width, 320, window.innerWidth),
      height: clamp(next.height, 240, window.innerHeight),
      maximized: false
    }));
  };

  useEffect(() => {
    const onResize = () => {
      setWindows(prev =>
        prev.map(w =>
          w.maximized
            ? { ...w, x: 0, y: 0, width: window.innerWidth, height: window.innerHeight }
            : w
        )
      );
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useImperativeHandle(ref, () => ({
    openWindow
  }), []);

  return (
    <>
      {windows.map(w => (
        !w.minimized && (
          <Window
            key={w.id}
            window={w}
            viewport={getContentViewport(w)}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onMaximize={() => maximizeWindow(w.id)}
            onFocus={() => focusWindow(w.id)}
            onMove={(pos) => moveWindow(w.id, pos)}
            onResize={(next) => resizeWindow(w.id, next)}
          />
        )
      ))}
    </>
  );
});

export default WindowManager;