import React from "react";
import { Spin } from "antd";

export const Loading = () => {
  return (
    <div className="spinner">
      <Spin size="large" />
    </div>
  );
};
