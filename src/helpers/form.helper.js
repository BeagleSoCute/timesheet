export const renderFieldTitle = (title, description) => {
  return (
    <div className="field-title">
      <span>{title}</span>
      <span className="description text-gray-500 font-medium">
        {description}
      </span>
    </div>
  );
};

export const renderFieldTitleSameLine = (title, description) => {
  return (
    <div className="field-title">
      <span>{title}</span>
      <span className=" text-gray-500 font-medium">
        <span className="font-bold text-black">:</span> {description}
      </span>
    </div>
  );
};
