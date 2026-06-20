import Draggable  from 'react-draggable'
import '../css/Window.css'
function Window({window, onClose, onMinimize, onMaximize, onFocus,onMove}) {
    const App = window.component;


    //stupid auto complete on draggable
    return (
        <div
    className="window"
    style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex, //added focus functionality
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
        <App width={window.width} height={window.height}  />
    </div>
</div>
    )
}

export default Window