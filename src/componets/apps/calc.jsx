
import '../../css/Calc.css';
import {useState} from "react";


function Calc() {
  const [display, setDisplay] = useState("0");

  const append = (val) => {
    if (display === "0") return setDisplay(String(val));
    setDisplay(display + val);
  };

  const clear = () => setDisplay("0");

  const backspace = () => {
    if (display.length === 1) return setDisplay("0");
    setDisplay(display.slice(0, -1));
  };

  const calculate = () => {
    try {
      setDisplay(String(Function(`return (${display})`)()));
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <div className="calc">
      <div className="calc-display">{display}</div>

      <div className="calc-grid">
        <button onClick={clear}>C</button>
        <button onClick={backspace}>DEL</button>
        <button onClick={() => append("/")}>/</button>
        <button onClick={() => append("*")}>*</button>

        <button onClick={() => append("7")}>7</button>
        <button onClick={() => append("8")}>8</button>
        <button onClick={() => append("9")}>9</button>
        <button onClick={() => append("-")}>-</button>

        <button onClick={() => append("4")}>4</button>
        <button onClick={() => append("5")}>5</button>
        <button onClick={() => append("6")}>6</button>
        <button onClick={() => append("+")}>+</button>

        <button onClick={() => append("1")}>1</button>
        <button onClick={() => append("2")}>2</button>
        <button onClick={() => append("3")}>3</button>
        <button onClick={calculate}>=</button>

        <button onClick={() => append("0")}>0</button>
        <button onClick={() => append(".")}>.</button>
      </div>
    </div>
  );
}
export default Calc