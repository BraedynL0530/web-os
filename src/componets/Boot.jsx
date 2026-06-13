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

    const ascii = `                                                                    ..;===+.
                                                                .:=iiiiii=+=
                                                             .=i))=;::+)i=+,
                                                          ,=i);)I)))I):=i=;
                                                       .=i==))))ii)))I:i++
                                                     +)+))iiiiiiii))I=i+:'
                                .,:;;++++++;:,.       )iii+:::;iii))+i='
                             .:;++=iiiiiiiiii=++;.    =::,,,:::=i));=+'
                           ,;+==ii)))))))))))ii==+;,      ,,,:=i))+=:
                         ,;+=ii))))))IIIIII))))ii===;.    ,,:=i)=i+
                        ;+=ii)))IIIIITIIIIII))))iiii=+,   ,:=));=,
                      ,+=i))IIIIIITTTTTITIIIIII)))I)i=+,,:+i)=i+
                     ,+i))IIIIIITTTTTTTTTTTTI))IIII))i=::i))i='
                    ,=i))IIIIITLLTTTTTTTTTTIITTTTIII)+;+i)+i\`
                    =i))IIITTLTLTTTTTTTTTIITTLLTTTII+:i)ii:'
                   +i))IITTTLLLTTTTTTTTTTTTLLLTTTT+:i)))=,
                   =))ITTTTTTTTTTTLTTTTTTLLLLLLTi:=)IIiii;
                  .i)IIITTTTTTTTLTTTITLLLLLLLT);=)I)))))i;
                  :))IIITTTTTLTTTTTTLLHLLLLL);=)II)IIIIi=:
                  :i)IIITTTTTTTTTLLLHLLHLL)+=)II)ITTTI)i=
                  .i)IIITTTTITTLLLHHLLLL);=)II)ITTTTII)i+
                  =i)IIIIIITTLLLLLLHLL=:i)II)TTTTTTIII)i'
                +i)i)))IITTLLLLLLLLT=:i)II)TTTTLTTIII)i;
              +ii)i:)IITTLLTLLLLT=;+i)I)ITTTTLTTTII))i;
             =;)i=:,=)ITTTTLTTI=:i))I)TTTLLLTTTTTII)i;
           +i)ii::,  +)IIITI+:+i)I))TTTTLLTTTTTII))=,
         :=;)i=:,,    ,i++::i))I)ITTTTTTTTTTIIII)=+'
       .+ii)i=::,,   ,,::=i)))iIITTTTTTTTIIIII)=+
      ,==)ii=;:,,,,:::=ii)i)iIIIITIIITIIII))i+:'
     +=:))i==;:::;=iii)+)=  \`:i)))IIIII)ii+'
   .+=:))iiiiiiii)))+ii;
  .+=;))iiiiii)));ii+
 .+=i:)))))))=+ii+
.;==i+::::=)i=;
,+==iiiiii+,
\`+=+++;\`
`

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

    const bootComplete = currentLine >= bootLines.length && currentFrame >= loadFrames.length;

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
            <h1 className="boot-title">NebulaOS</h1>
            <div className="boot">
                <div className="boot-container">
                    <h1 className="boot-header">Sys Boot</h1>
                    <div className="boot-text">
                        {bootLines.map((line, index) => (
                            <p key={index} className={`line ${index < currentLine ? 'visible' : ''}`}>
                                {line}
                                </p>
                        ))}
                         <div className="boot-loader">
                             <p>{loadFrames[currentFrame] || loadFrames[loadFrames.length - 1]}</p>
                         </div>
                        <p className={`hint ${bootComplete ? 'visible' : ''}`}>Press any key to continue...</p>
                    </div>
                </div>

                <pre className="ascii-bg">
                    {ascii}
                </pre>


            </div>
        </>

    )
}

export default Boot