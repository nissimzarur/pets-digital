import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  let type = "bars";
  let color = "black";

  return <ReactLoading type={type} color={color} height={64} width={64} />;
}
