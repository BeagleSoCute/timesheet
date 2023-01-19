import { Table } from "antd";

const TableData = ({ columns, data }) => {
  return (
    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default TableData;
