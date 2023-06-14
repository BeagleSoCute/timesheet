import React from "react";
import { Form } from "antd";

type ColSpan = number | { span: number; push: number };
interface ColProps {
  span?: number;
  offset?: number;
  xs?: ColSpan;
  sm?: ColSpan;
  md?: ColSpan;
  lg?: ColSpan;
  xl?: ColSpan;
  xxl?: ColSpan;
}
interface Rule {
  required?: boolean;
  message?: string;
}
interface FormItemProps {
  className: string | undefined;
  colon: boolean | undefined;
  name: string;
  label: string;
  rules: Rule[];
  labelCol: ColProps;
  wrapperCol: ColProps;
  children: React.ReactNode;
}

export const RenderFormItem = (data: any[]) => {
  return data.map((item: FormItemProps) => (
    <Form.Item
      className={item.className}
      colon={item.colon !== undefined ? item.colon : false}
      name={item.name}
      label={item.label}
      rules={item.rules}
      labelCol={item.labelCol}
      wrapperCol={item.wrapperCol}
    >
      {item.children}
    </Form.Item>
  ));
};
