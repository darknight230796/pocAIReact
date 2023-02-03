import nandi from "./nandi";
import Order from "./order";
import dataJson from "./data.json";
import { refreshTime } from "./constants";
class Factory {
  static data = dataJson;
  static interval: NodeJS.Timer | number | null = null;
  static orders: Array<Order> = [];

  static init() {
    if (!Factory.interval) Factory.interval = setInterval(nandi, refreshTime);
  }

  static addOrder(order: Order) {
    Factory.orders.push(order);
  }

  static shiftOrder() {
    Factory.orders.shift();
  }

  static kill() {
    if (Factory.interval) {
      clearInterval(Factory.interval);
      Factory.interval = null;
    }
  }
}

export default Factory;
