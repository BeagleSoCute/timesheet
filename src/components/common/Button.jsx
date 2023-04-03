import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { combineClassNames } from "helpers/common.helper";

const propTypes = {
  type: PropTypes.string,
};
const defaultProps = {
  // type: "",
};

const StyledButton = ({ label, type, className, ...props }) => {
  return (
    <div className="button">
      {type === "primary" ? (
        <Button
          className={combineClassNames(
            "bg-yellow-400 text-black font-bold text-base w-32 h-12",
            className
          )}
          {...props}
        >
          {label}
        </Button>
      ) : (
        <Button
          className={combineClassNames(" text-base w-32 h-12", className)}
          {...props}
        >
          {label}
        </Button>
      )}
    </div>
  );
};
StyledButton.propTypes = propTypes;
StyledButton.defaultProps = defaultProps;
export default StyledButton;
