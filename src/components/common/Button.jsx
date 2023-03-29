import React from "react";
import { Button } from "antd";

const StyledButton = (props) => {
  const { label, type } = props;
  return (
    <div className="button">
      {type === "primary" && (
        <Button
          className="bg-yellow-400 text-black font-bold text-base w-32 h-12"
          {...props}
        >
          {label}
        </Button>
      )}
    </div>
  );
};

export default StyledButton;
