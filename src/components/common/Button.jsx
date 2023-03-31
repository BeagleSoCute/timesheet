import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { combineClassNames } from "helpers/common.helper";

const propTypes = {
  isprimary: PropTypes.string,
};
const defaultProps = {
  isprimary: "true",
};

const StyledButton = ({ label, isprimary, className, ...props }) => {
  console.log("isprimary", isprimary);
  return (
    <div className="button">
      {isprimary === "true" ? (
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
          className={combineClassNames(
            "bg-blue-800 text-white font-bold text-base w-32 h-12",
            className
          )}
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
