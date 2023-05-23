import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { combineClassNames } from "helpers/common.helper";
import styled from "styled-components";

const propTypes = {
  type: PropTypes.string,
};
const defaultProps = {
  // type: "",
};

const StyledButton = ({ label, type, className, ...props }) => {
  return (
    <StyledDiv className="button">
      {type === "primary" ? (
        <Button
          className={combineClassNames(
            "primary-button bg-yellow-400 text-black font-bold text-base w-32 h-12",
            className
          )}
          {...props}
        >
          {label}
        </Button>
      ) : (
        <Button
          className={combineClassNames(
            "default-buttons text-base w-100 h-12",
            className
          )}
          {...props}
        >
          {label}
        </Button>
      )}
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  &.button {
    .primary-button.ant-btn:hover {
      color: inherit !important;
      border-color: inherit !important;
    }
    .default-button.ant-btn:hover {
      border-color: inherit !important;
    }
    .no-color-button.ant-btn:hover {
      color: inherit !important;
      border-color: inherit !important;
    }
  }
`;
StyledButton.propTypes = propTypes;
StyledButton.defaultProps = defaultProps;
export default StyledButton;
