import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Counter</h2>
      <h3>{count}</h3>
      <div>
        <button
          onClick={increment}
          style={{ margin: "5px", padding: "10px", cursor: "pointer" }}
        >
          +
        </button>
        <button
          onClick={decrement}
          style={{ margin: "5px", padding: "10px", cursor: "pointer" }}
        >
          -
        </button>
        <button
          onClick={reset}
          style={{ margin: "5px", padding: "10px", cursor: "pointer" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
