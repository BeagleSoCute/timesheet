import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = {
  instructionMessage: PropTypes.string,
};
const defaultProps = {
  instructionMessage: "No instruction message",
};

const Message = ({ instructionMessage }) => {
  return (
    <StyledDiv className="message">
      <div className=" mb-0 bg-blue-900	">
        <p className="text-white font-bold	">Welcome, Brunton</p>
      </div>
      <div className=" mb-5 bg-red-600	">
        <p className="text-white font-bold	">{instructionMessage}</p>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.message {
    p {
      padding: 10px;
      margin: 0px;
    }
  }
`;

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;
