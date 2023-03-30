import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

const propTypes = {
  isprimary: PropTypes.bool,
};
const defaultProps = {
  isprimary: true,
};

const StyledButton = (props) => {
  const { label, isprimary } = props;
  return (
    <div className="button">
      {isprimary ? (
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
