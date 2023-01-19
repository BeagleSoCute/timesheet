import { Button } from "antd";

export const allUserColums = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "View",
    dataIndex: "view",
    key: "view",
    width: "5%",

    render: () => <Button>View</Button>,
  },
  {
    title: "Edit",
    dataIndex: "edit",
    key: "edit",
    width: "5%",

    render: () => <Button>Edit</Button>,
  },
  {
    title: "Delete",
    dataIndex: "delete",
    key: "delete",
    width: "5%",

    render: () => <Button>Delete</Button>,
  },
];
