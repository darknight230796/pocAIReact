import { useState } from "react";
import Factory from "./Factory";
import React from "react";

const DataTable = (props: { factory: Factory }) => {
  const { factory } = props;
  const [data, setData] = useState("");
  factory.getData(setData);

  return (
    <div>
      <p>DataTable</p>
      <p>{factory.getBots()}</p>
      <p>{data}</p>
    </div>
  );
};
export default DataTable;
