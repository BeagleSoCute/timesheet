import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  data: PropTypes.array,
};

const defaultProps = {
  data: [],
};

const AllocationData = ({ data }:{data:{job:string,supervisors:string, lab:string, asset:string, labourHours:string}[]}) => {
  return (
    <div className="allocation-data font-bold mb-10">
      <div className="header-wrapper bg-blue-800  text-white p-3">
        <span className="">Job | CC | Op/Lab | Asset | Hours</span>
        <span className="block"> Allocated hours below</span>
      </div>
      <div className="mt-2">
        {data.map((item, index) => (
          <div className="data-wrapper mb-2" key={index}>
            <span className="">
              {index + 1 + "."}
              {item.job} | {item.supervisors} | {item.lab} | {item.asset} |
              {item.labourHours}hrs
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

AllocationData.propTypes = propTypes;
AllocationData.defaultProps = defaultProps;

export default AllocationData;
