import "./App.css";
import DataTable from "./DataTable";
import Factory from "./Factory";
import React, { useEffect, useState } from "react";
import { refreshTime } from "./constants";

function App() {
  const [showDataTable, setShowDataTable] = useState(false);
  const [orders, setOrders] = useState(Factory.orders);
  const clickHandler = () => {
    setShowDataTable(true);
    Factory.init();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders([...Factory.orders]);
    }, refreshTime);
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <button onClick={clickHandler}>Click to simulate</button>
      {showDataTable && <DataTable orders={orders} />}
    </div>
  );
}

export default App;
