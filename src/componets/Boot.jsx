import '../css/Boot.css'

function Boot() {

    return (
        <>
            <div className="boot">
                <div className="boot-header">
                    <h1>sys boot</h1>
                    <div className="boot-text">
                        <p className="line">[NebulaOS OS v0.1] BOOTING...</p>
                        <p className="line">Loading kernel...</p>
                        <p className="line">Loading initrd...</p>
                        <p className="line">Mounting Files...</p>
                        <p className="line">Starting System...</p>
                        <p className="line">Welcome to NebulaOS</p>
                        <p className="hint">Press any key to continue...</p>
                    </div>
                </div>

                <div className="boot-loader">
                    
                </div>
            </div>
        </>
    )
}