import Factory from "./Factory";
import { maxOrders } from "./constants";
import Order from "./order";

const nandi = () => {
  generateOrder();
  settleOrder();
  Factory.addPrice();
};

const generateOrder = () => {
  if (Factory.orders.length >= maxOrders) {
    Factory.shiftOrder();
  }

  const stockIndex = Math.floor(Math.random() * 4);
  const buySell = Math.random() > 0.5 ? 1 : -1;
  const price = Factory.data[stockIndex].price + (Math.random() - 0.5) * 4;
  Factory.addOrder(new Order(stockIndex, buySell, price));
};

const settleOrder = () => {
  Factory.data.forEach((stock, index) => {
    const bid = Factory.orders
      .filter((order) => order.stockIndex === index && order.direction === 1)
      .sort((a, b) => b.price - a.price);

    const ask = Factory.orders
      .filter((order) => order.stockIndex === index && order.direction === -1)
      .sort((a, b) => a.price - b.price);

    while (bid.length > 0 && ask.length > 0) {
      const bidPrice = bid[0].price;
      const askPrice = ask[0].price;

      if (bidPrice >= askPrice) {
        stock.price = (bidPrice + askPrice) / 2;
        const removeOrder = [bid[0], ask[0]];
        Factory.orders = Factory.orders.filter(
          (order) => !removeOrder.includes(order)
        );

        bid.shift();
        ask.shift();
      } else {
        break;
      }
    }
  });
};

export default nandi;
