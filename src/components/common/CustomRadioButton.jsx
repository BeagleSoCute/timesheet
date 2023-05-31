import React from "react";
import styled from "styled-components";
import { Radio } from "antd";
import PropTypes from "prop-types";

const propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.bool,
};
const defaultProps = {
  color: "yellow",
  onChange: () => {},
  defaultValue: true,
};

const CustomRadioButton = ({ color, onChange, defaultValue, ...props }) => {
  return (
    <StyledDiv className="custom-radio-button">
      <Radio.Group
        {...props}
        defaultValue={defaultValue}
        className={`custom-radio-button ${color}`}
        onChange={(e) => onChange(e.target.value)}
        size="large"
      >
        <Radio.Button className="mx-2" value={true}>
          Yes
        </Radio.Button>
        <Radio.Button value={false}>No</Radio.Button>
      </Radio.Group>
    </StyledDiv>
  );
};

CustomRadioButton.propTypes = propTypes;
CustomRadioButton.defaultProps = defaultProps;

const StyledDiv = styled.div`
  &.custom-radio-button {
    .yellow .ant-radio-button-wrapper.ant-radio-button-wrapper-checked {
      background-color: #e9c250 !important;
      border-color: #e9c250 !important;
    }
  }
`;

export default CustomRadioButton;