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
import { Line, Scatter } from "react-chartjs-2";

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

export const supplyDemandOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Supply demand chart",
    },
  },
  showLine: true,
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

  const getBidAskList = (index: number) => {
    const bidAsk = Factory.data[index];
    const rows = [];

    for (let i = 0; i < Math.max(bidAsk.bid.length, bidAsk.ask.length); i++) {
      rows.push(
        <tr>
          {i < bidAsk.bid.length ? (
            <td>{Factory.getOrder(bidAsk.bid[i])?.orderId}</td>
          ) : (
            <td>-</td>
          )}
          {i < bidAsk.bid.length ? (
            <td>{Factory.getOrder(bidAsk.bid[i])?.price.toFixed(2)}</td>
          ) : (
            <td>-</td>
          )}
          {i < bidAsk.bid.length ? (
            <td>{Factory.getOrder(bidAsk.bid[i])?.quantity}</td>
          ) : (
            <td>-</td>
          )}
          {i < bidAsk.ask.length ? (
            <td>{Factory.getOrder(bidAsk.ask[i])?.orderId}</td>
          ) : (
            <td>-</td>
          )}
          {i < bidAsk.ask.length ? (
            <td>{Factory.getOrder(bidAsk.ask[i])?.price.toFixed(2)}</td>
          ) : (
            <td>-</td>
          )}
          {i < bidAsk.ask.length ? (
            <td>{Factory.getOrder(bidAsk.ask[i])?.quantity}</td>
          ) : (
            <td>-</td>
          )}
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
                <td>{stocks.price.toFixed(2)}</td>
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
            const chartDataSupplyDemand = {
              datasets: [
                {
                  label: "bid",
                  data: stock.bid.map((orderId) => {
                    const order = Factory.getOrder(orderId);
                    return {
                      x: order?.quantity,
                      y: order?.price,
                    };
                  }),
                  borderColor: "rgb(0, 0, 255)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                  label: "ask",
                  data: stock.ask.map((orderId) => {
                    const order = Factory.getOrder(orderId);
                    return {
                      x: order?.quantity,
                      y: order?.price,
                    };
                  }),
                  borderColor: "rgb(255, 0, 0)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            };
            return (
              <div>
                <Scatter
                  options={supplyDemandOptions}
                  data={chartDataSupplyDemand}
                />
                <table>
                  <thead>
                    <tr>
                      <td colSpan={3}>{stock.name}</td>
                      <td colSpan={3}>{stock.price.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>OrderId</td>
                      <td>Bid</td>
                      <td>Quantity</td>
                      <td>OrderId</td>
                      <td>Ask</td>
                      <td>Quantity</td>
                    </tr>
                  </thead>
                  <tbody>{getBidAskList(index)}</tbody>
                </table>
              </div>
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
                  <td>{order.price.toFixed(2)}</td>
                  <td>{order.quantity}</td>
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
