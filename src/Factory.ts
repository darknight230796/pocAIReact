import dataJson from "./data.json";
class Factory {
  data = dataJson;
  interval: number | null = null;
  setData: Function = () => {};
  bots: number;
  i: number;
  constructor(bots: number) {
    this.bots = bots;
    this.i = -1;
  }

  getBots() {
    return this.bots;
  }

  getStocksData() {
    return this.data;
  }

  init(setData: any) {
    this.setData = setData;
    if (!this.interval) this.interval = setInterval(this.timer, 3000, this);
  }
  timer(factory: {
    i: number;
    setData: (arg0: any) => void;
    data: { [x: string]: { name: any } };
  }) {
    if (factory.i >= 3) factory.i = 0;
    else {
      factory.i++;
    }
    factory.setData(factory.data[factory.i].name);
  }
  kill() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export default Factory;
