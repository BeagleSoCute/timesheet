import React from "react";
import { Button } from "antd";
import { combineClassNames } from "helpers/common.helper";
import styled from "styled-components";

interface propsType {
  label: string;
  type?: "default" | "primary" | "ghost" | "dashed" | "link" | "text";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  htmlType?: "button" | "submit" | "reset" | undefined;
}

const StyledButton = ({
  label,
  type,
  className = "",
  disabled = false,
  ...props
}: propsType) => {
  return (
    <StyledDiv className="button">
      <Button
        disabled={disabled}
        className={combineClassNames(
          type === "primary"
            ? "primary-button bg-yellow-400 text-black font-bold text-base w-32 h-12"
            : "default-buttons text-base w-100 h-12",
          className
        )}
        {...props}
      >
        {label}
      </Button>
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
