import "./App.css";
import Child from "./components/Child";
import { useState} from "react";

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <h1>
        Counter App 
      </h1>
      <h2>{count}</h2>
      <Child
       count={count}
       setCount={setCount}/>
      {count < 0 && <p>Why so negative?</p>}
    </div>
  );
};

export default App;