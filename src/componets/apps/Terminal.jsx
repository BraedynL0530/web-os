import { useState } from "react";
import '../../css/Terminal.css';

function Terminal() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([
    "Nebula Terminal v0.1",
    "type 'help' for commands"
  ]);

  const asciiCat = [
    " /\\_/\\",
    "( o.o )",
    " > ^ <"
  ].join("\n");

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;
    const cmd = input.trim();
    let output = "";

    if (cmd === "help") {
      output = "commands: help, clear, cat";
    } else if (cmd === "cat") {
      output = asciiCat;
    } else if (cmd === "clear") {
      setLogs([]);
      setInput("");
      return;
    } else if (cmd === "") {
      return;
    } else {
      output = `command not found: ${cmd}`;
    }

    setLogs(prev => [ ...prev, `$ ${cmd}`, output ]);
    setInput("");
  };

  return (
    <div className="terminal">
      <div className="terminal-header"> Nebula Terminal </div>
      <div className="terminal-body">
        {logs.map((log, i) => (
          <pre key={`${log}-${i}`} className="terminal-line">
            {log}
          </pre>
        ))}
        <div className="terminal-input-line">
          <span>$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

export default Terminal;
