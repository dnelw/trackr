import React from "react";
import { Spin } from "antd";

class Loading extends React.Component {
  render() {
    return (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  }
}

export default Loading;
