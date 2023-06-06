import React from 'react'
import { Button} from "antd";
import { combineClassNames } from "helpers/common.helper";
import styled from "styled-components";

interface propsType  {
  label: string, 
  type: string, 
  className: string,
  onClick?: () => void,
  htmlType?: any
}

const StyledButton = ({ label, type, className, ...props }:propsType) => {
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

export default StyledButton;
