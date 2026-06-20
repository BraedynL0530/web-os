import "../css/Window.css";

function Window({
  window,
  viewport,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize
}) {
  const App = window.component;

  const startResize = (e) => {
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = window.width;
    const startHeight = window.height;

    const onMouseMove = (ev) => {
      onResize?.({
        width: Math.max(320, startWidth + (ev.clientX - startX)),
        height: Math.max(240, startHeight + (ev.clientY - startY))
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className="window"
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
        position: "absolute"
      }}
    >
      <div
        className="window-controls"
        onMouseDown={(e) => {
          onFocus?.(window.id);

          const startX = e.clientX;
          const startY = e.clientY;
          const baseX = window.x;
          const baseY = window.y;

          const onMoveMouse = (ev) => {
            onMove?.({
              x: baseX + (ev.clientX - startX),
              y: baseY + (ev.clientY - startY)
            });
          };

          const onUp = () => {
            document.removeEventListener("mousemove", onMoveMouse);
            document.removeEventListener("mouseup", onUp);
          };

          document.addEventListener("mousemove", onMoveMouse);
          document.addEventListener("mouseup", onUp);
        }}
      >
        <div className="window-title">{window.title}</div>

        <div className="window-buttons">
          <button onClick={onMinimize}>-</button>
          <button onClick={onMaximize}>[]</button>
          <button onClick={onClose}>X</button>
        </div>
      </div>

      <div className="window-content">
        <App
          width={viewport?.width ?? window.width}
          height={viewport?.height ?? window.height}
        />
      </div>

      <div className="resize-handle" onMouseDown={startResize} />
    </div>
  );
}

export default Window;