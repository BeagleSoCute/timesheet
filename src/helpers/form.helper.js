export const renderFieldTitle = (title, description) => {
  return (
    <div className="field-title">
      <span>{title}</span>{" "}
      <span className="description text-gray-500 font-medium">
        {description}
      </span>
    </div>
  );
};
