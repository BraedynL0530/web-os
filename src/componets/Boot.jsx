import '../css/Boot.css'
import {useEffect, useState} from "react";

function Boot() {

    const bootLines = [
        '[NebulaOS OS v0.1] BOOTING...',
        'Loading kernel...',
        'Loading initrd...',
        'Mounting Files...',
        'Starting System...',
        'Welcome Back to NebulaOS :3'
    ]

    const loadFrames = [
        '[░░░░░░░░░░░░░░░░░░░░]',
        '[█░░░░░░░░░░░░░░░░░░░]',
        '[██░░░░░░░░░░░░░░░░░░]',
        '[███░░░░░░░░░░░░░░░░░]',
        '[████░░░░░░░░░░░░░░░░]',
        '[█████░░░░░░░░░░░░░░░]',
        '[██████░░░░░░░░░░░░░░]',
        '[█████████░░░░░░░░░░░]',
        '[██████████░░░░░░░░░░]',
        '[████████████░░░░░░░░]',
        '[█████████████░░░░░░░]',
        '[█████████████████░░░]',
        '[█████████████████░░░]',
        '[██████████████████░░]',
        '[████████████████████]',

    ]

    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        if (currentLine < bootLines.length) {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 400)
            return () => clearTimeout(timer);
        }
    })

    useEffect(() => {
        const handleKeyDown = (event) => {
            window.location.href = '/'; //temp location
        };
        window.addEventListener('keydown', handleKeyDown);
        
        return () => window.removeEventListener('keydown', handleKeyDown)
    })
    return (
        <>
            <div className="boot">
                <div className="boot-header">
                    <h1>sys boot</h1>
                    <div className="boot-text">
                        {bootLines.map((line, index) => (
                            <p key={index} className={`line ${index < currentLine ? 'visible' : ''}`}>
                                {line}
                                </p>
                        ))}
                        <p className="hint">Press any key to continue...</p>
                    </div>
                </div>

                <div className="boot-loader">
                    {loadFrames.map((frame, index) => (
                        <p key={index} className={`frame ${index < currentLine ? 'visible' : ''}`}></p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Boot