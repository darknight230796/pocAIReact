import Factory from "./Factory";

class Order {
  orderId: number;
  stockIndex: number;
  direction: -1 | 1; // -1 to sell +1 to buy
  price: number;

  constructor(stockIndex: number, direction: -1 | 1, price: number) {
    this.orderId =
      Factory.orders.length > 0
        ? Factory.orders[Factory.orders.length - 1].orderId + 1
        : 0;
    this.stockIndex = stockIndex;
    this.direction = direction;
    this.price = price;
  }
}

export default Order;
