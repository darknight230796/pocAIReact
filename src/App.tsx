import "./App.css";
import DataTable from "./DataTable";
import Factory from "./Factory";
import React, { ChangeEvent, useEffect, useState } from "react";
import { refreshTime } from "./constants";

function App() {
  const [showDataTable, setShowDataTable] = useState(false);
  const [pct, setPct] = useState(5);
  const [orders, setOrders] = useState(Factory.orders);
  const clickHandler = () => {
    setShowDataTable(true);
    Factory.init(pct);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders([...Factory.orders]);
    }, refreshTime);
    return () => clearInterval(interval);
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPct(Number(e.target.value));
  };

  return (
    <div className="App">
      <p>Change percentage</p>
      <input onChange={onChangeHandler} type="number" value={pct} />
      <p>%</p>
      <button onClick={clickHandler}>Click to simulate</button>

      <button
        onClick={() => {
          Factory.kill();
        }}
      >
        Stop Simulation
      </button>
      {showDataTable && <DataTable orders={orders} />}
    </div>
  );
}

export default App;
