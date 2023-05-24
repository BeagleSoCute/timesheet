import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Select } from "antd";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";

const employees = [
  { value: "1", label: "Jack Johnson" },
  { value: "2", label: "John Doe" },
  { value: "3", label: "Dozen Doe" },
  { value: "4", label: "Mark Smith" },
  { value: "5", label: "Zoe Can" },
  { value: "6", label: "Jack Dum" },
];

const SelectEmployeePage = () => {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();
  return (
    <StyledDiv className="select-employee-page p-5 mt-10 	">
      <Row className=" w-100  	">
        <Col span={24}>
          <Select
            placeholder="Select a employee"
            className="w-full"
            options={employees}
            onChange={(value) => setEmployee(value)}
          ></Select>
          <div className="mt-10 flex justify-center items-center">
            <Button
              disabled={!employee}
              label="Select"
              onClick={() =>
                navigate(`/supervisor/assign-timesheet/${employee}`)
              }
            />{" "}
          </div>
        </Col>
      </Row>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  &.select-employee-page {
    /* height: calc(100vh - 330px); */
  }
`;
export default SelectEmployeePage;
