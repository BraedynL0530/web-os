import Draggable  from 'react-draggable'
import '../css/Window.css'
function Window({window, onClose, onMinimize, onMaximize, onFocus}) {
    const App = window.component;


    //stupid auto complete on draggable
    return (
        <Draggable handle=".window-controls" cancel=".window-buttons">
        <div className="window">
            <div className="window-controls">
                <div className="window-title">{window.title}</div>
                <div className="window-buttons">
                    <button className="minimize-btn" onClick={onMinimize}>-</button>
                    <button className="maximize-btn" onClick={onMaximize}>[]</button>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
            </div>
            <div className="window-content">
                <App />
            </div>
        </div>
        </Draggable>
    )
}

export default Window