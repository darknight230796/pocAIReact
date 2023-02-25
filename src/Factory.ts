import nandi from "./nandi";
import Order from "./order";
import dataJson from "./data.json";
import { refreshTime } from "./constants";
class Factory {
  static data = dataJson as Array<{
    name: string;
    price: number;
    shares: number;
    priceChange: Array<number>;
    bid: Array<number>;
    ask: Array<number>;
  }>;
  static interval: NodeJS.Timer | number | null = null;
  static orders: Array<Order> = [];
  static addPriceCounter: number = 0;

  static init() {
    if (!Factory.interval) Factory.interval = setInterval(nandi, refreshTime);
  }

  static addOrder(order: Order) {
    Factory.orders.push(order);
  }

  static shiftOrder() {
    const order = Factory.orders.shift();
    if (!order) return;
    const bidAsk = order.direction === 1 ? "bid" : "ask";
    const index = Factory.data[order.stockIndex][bidAsk].indexOf(order.orderId);
    if (index !== -1) {
      Factory.data[order.stockIndex][bidAsk].splice(index, 1);
    }
  }

  static addPrice() {
    if (this.addPriceCounter >= 20) {
      Factory.data.forEach((d) => d.priceChange.push(d.price));
      this.addPriceCounter = 0;
    }
    this.addPriceCounter += 1;
  }

  static kill() {
    if (Factory.interval) {
      clearInterval(Factory.interval);
      Factory.interval = null;
    }
  }

  static getOrder(orderId: number) {
    return Factory.orders.find((order) => order.orderId === orderId);
  }
}

export default Factory;
