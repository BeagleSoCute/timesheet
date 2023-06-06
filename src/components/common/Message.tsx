import React from "react";
import styled from "styled-components";

const Message = ({ instructionMessage="No instruction message" }:{instructionMessage:string}) => {
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

export default Message;
