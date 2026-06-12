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
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        if (currentLine < bootLines.length) {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 800)
            return () => clearTimeout(timer);
        }
    }, [currentLine, bootLines.length])

    useEffect(() => {
        if (currentFrame < loadFrames.length) {
            const timer = setTimeout(() => {
                setCurrentFrame(prev => prev + 1);
            }, 353)
            return () => clearTimeout(timer);
        }
    }, [currentFrame, loadFrames.length])

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
                <h1 className="boot-title">NebulaOS</h1>
                <div className="boot-container">
                    <h1 className="boot-header">Sys Boot</h1>
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
                     <p>{loadFrames[currentFrame] || loadFrames[loadFrames.length - 1]}</p>
                </div>
            </div>
        </>

    )
}

export default Boot