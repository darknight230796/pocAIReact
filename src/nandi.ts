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

  const order = new Order(stockIndex, buySell, price);
  Factory.addOrder(order);
  const bidAsk = buySell === 1 ? "bid" : "ask";

  Factory.data[stockIndex][bidAsk].push(order.orderId);
  Factory.data[stockIndex][bidAsk].sort((a, b) => {
    const orderA = Factory.getOrder(a);
    const orderB = Factory.getOrder(b);
    if (orderA && orderB) return (orderB.price - orderA.price) * buySell;
    return 0;
  });
};

const settleOrder = () => {
  Factory.data.forEach((stock, index) => {
    while (stock.bid.length > 0 && stock.ask.length > 0) {
      const bidOrder = Factory.getOrder(stock.bid[0]);
      const askOrder = Factory.getOrder(stock.ask[0]);
      if (!bidOrder || !askOrder) return;
      const bidPrice = bidOrder.price;
      const askPrice = askOrder.price;

      if (bidPrice >= askPrice) {
        stock.price = (bidPrice + askPrice) / 2;
        const removeOrder = [bidOrder, askOrder];
        Factory.orders = Factory.orders.filter(
          (order) => !removeOrder.includes(order)
        );
        stock.ask.shift();
        stock.bid.shift();
      } else {
        break;
      }
    }
  });
};

export default nandi;
