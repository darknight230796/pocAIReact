import Factory from "./Factory";
import React from "react";
import Order from "./order";
import { maxOrders } from "./constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Price change chart",
    },
  },
};

const chartColors = [
  {
    borderColor: "rgb(255, 0, 0)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    borderColor: "rgb(0, 255, 0)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    borderColor: "rgb(0, 0, 255)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
];

const DataTable = (props: { orders: Array<Order> }) => {
  const { orders } = props;
  const bidAskList: Record<
    number,
    Record<"bid" | "ask", Array<JSX.Element>>
  > = {};

  Factory.data.forEach((stock, index) => {
    if (!bidAskList[index])
      Object.assign(bidAskList, { [index]: { bid: [], ask: [] } });
    bidAskList[index].bid = orders
      .filter((order) => order.stockIndex === index && order.direction === 1)
      .sort((a, b) => b.price - a.price)
      .map((order) => <td>{order.price}</td>);

    bidAskList[index].ask = orders
      .filter((order) => order.stockIndex === index && order.direction === -1)
      .sort((a, b) => a.price - b.price)
      .map((order) => <td>{order.price}</td>);
  });

  const getBidAskList = (index: number) => {
    const bidAsk = bidAskList[index];
    const rows = [];

    for (let i = 0; i < Math.max(bidAsk.bid.length, bidAsk.ask.length); i++) {
      rows.push(
        <tr>
          {i < bidAsk.bid.length ? bidAsk.bid[i] : <td>-</td>}
          {i < bidAsk.ask.length ? bidAsk.ask[i] : <td>-</td>}
        </tr>
      );
    }
    return rows;
  };

  const chartData = {
    labels: new Array(Factory.data[0].priceChange.length).fill(0),
    datasets: Factory.data.map((d, index) => {
      return {
        label: d.name,
        data: d.priceChange,
        borderColor: chartColors[index].borderColor,
        backgroundColor: chartColors[index].backgroundColor,
      };
    }),
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(Factory.data[0]).map((key) => {
              return <td>{key.toUpperCase()}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {Factory.data.map((stocks) => {
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
      <p>Price change chart</p>
      <Line options={options} data={chartData} />
      <p>Bid Ask table for stocks</p>
      {orders.length > 0 && (
        <div style={{ display: "flex" }}>
          {Factory.data.map((stock, index) => {
            return (
              <table>
                <thead>
                  <tr>
                    <td>{stock.name}</td>
                    <td>{stock.price}</td>
                  </tr>
                  <tr>
                    <td>Bid</td>
                    <td>Ask</td>
                  </tr>
                </thead>
                <tbody>{getBidAskList(index)}</tbody>
              </table>
            );
          })}
        </div>
      )}
      <p>Current Orders in market (max {maxOrders})</p>
      {orders.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(orders[0]).map((key) => {
                return <td>{key.toUpperCase()}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr>
                  <td>{order.orderId}</td>
                  <td>{Factory.data[order.stockIndex].name}</td>
                  <td>{order.direction === 1 ? "Buy" : "Sell"}</td>
                  <td>{order.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default DataTable;
