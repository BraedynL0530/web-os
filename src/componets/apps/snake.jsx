import { useEffect, useRef, useState } from "react";
import "../../css/Snake.css";

const GRID_SIZE = 20;
const TICK_RATE = 120;
const maxLength = GRID_SIZE * GRID_SIZE;
const INITIAL_SNAKE = [[5, 5]];
const INITIAL_DIRECTION = [1, 0];

export default function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState([10, 10]);
  const [dir, setDir] = useState(INITIAL_DIRECTION);
  const dirRef = useRef(INITIAL_DIRECTION); // prevents instant reverse
  const [running, setRunning] = useState(true);

  const randomFood = () => [
    Math.floor(Math.random() * GRID_SIZE),
    Math.floor(Math.random() * GRID_SIZE),
  ];

  useEffect(() => {
    const handleKey = (e) => {
      let next = dirRef.current;

      switch (e.key) {
        case "ArrowUp":
          next = [0, -1];
          break;
        case "ArrowDown":
          next = [0, 1];
          break;
        case "ArrowLeft":
          next = [-1, 0];
          break;
        case "ArrowRight":
          next = [1, 0];
          break;
        default:
          return;
      }

      const isReverse =
        next[0] === -dirRef.current[0] && next[1] === -dirRef.current[1];

      if (!isReverse) {
        dirRef.current = next;
        setDir(next);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const d = dirRef.current;

        const newHead = [
          prev[0][0] + d[0],
          prev[0][1] + d[1],
        ];

        if (
          newHead[0] < 0 ||
          newHead[1] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] >= GRID_SIZE
        ) {
          setRunning(false);
          return prev;
        }

        if (prev.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
          setRunning(false);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newSnake.length === maxLength) { //got lazy
          setRunning(false);
          alert("You win 🔥");
          return newSnake;
        }

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(randomFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, TICK_RATE);

    return () => clearInterval(interval);
  }, [food, running]);

  return (
    <div className="snake-wrapper">
      <div
        className="snake-board"
        style={{
          width: "min(90vmin, 600px)",
          height: "min(90vmin, 600px)",
        }}
      >
        {snake.map(([x, y], i) => (
          <div
            key={i}
            className="snake-cell snake-body"
            style={{
              left: `${(x / GRID_SIZE) * 100}%`,
              top: `${(y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
            }}
          />
        ))}

        <div
          className="snake-cell snake-food"
          style={{
            left: `${(food[0] / GRID_SIZE) * 100}%`,
            top: `${(food[1] / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
          }}
        />
      </div>

      {!running && <div className="game-over">Game Over</div>}
    </div>
  );
}