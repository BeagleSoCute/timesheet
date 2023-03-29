import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

const propTypes = {
  isPrimary: PropTypes.bool,
};
const defaultProps = {
  isPrimary: true,
};

const StyledButton = (props) => {
  const { label, isPrimary } = props;
  return (
    <div className="button">
      {isPrimary ? (
        <Button
          className="bg-yellow-400 text-black font-bold text-base w-32 h-12"
          {...props}
        >
          {label}
        </Button>
      ) : (
        <Button
          className="bg-blue-800 text-white font-bold text-base w-32 h-12"
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
