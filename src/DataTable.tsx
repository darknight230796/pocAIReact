import { useState } from "react";
import Factory from "./Factory";
import React from "react";

const DataTable = (props: { factory: Factory }) => {
  const { factory } = props;
  const [data, setData] = useState("");
  factory.init(setData);
  const stocksData = factory.getStocksData();

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(stocksData[0]).map((key) => {
              return <td>{key.toUpperCase()}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {stocksData.map((stocks) => {
            return (
              <tr>
                <td>{stocks.name}</td>
                <td>{stocks.price}</td>
                <td>{stocks.shares}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>{factory.getBots()}</p>
      <p>{data}</p>
    </div>
  );
};
export default DataTable;
