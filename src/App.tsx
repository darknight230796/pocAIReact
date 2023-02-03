import { useState } from "react";
import "./App.css";
import DataTable from "./DataTable";
import Factory from "./Factory";
import React from "react";

function App() {
  const [bots, setBots] = useState(5);
  const [showDataTable, setShowDataTable] = useState(false);
  const [factory, setFactory] = useState<Factory>();
  const clickHandler = () => {
    if (factory) {
      factory.kill();
    }
    setShowDataTable(true);
    setFactory(new Factory(bots));
  };
  const setBotsState = (event: any) => {
    const botsNum = event.target.value;
    if (botsNum >= 5 && botsNum <= 20) {
      setBots(botsNum);
    }
  };
  return (
    <div className="App">
      <p>Number of bots (min 5 & max 20)</p>
      <input
        type="number"
        name="numberOfBots"
        onChange={setBotsState}
        value={bots}
      ></input>
      <br />
      <br />
      <button onClick={clickHandler}>Click to simulate</button>
      {showDataTable && <DataTable factory={factory} />}
    </div>
  );
}

export default App;
