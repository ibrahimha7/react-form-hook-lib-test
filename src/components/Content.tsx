import { Form, FormInstance, Input, InputNumber, Row } from "antd";
import { FC } from "react";

interface IProps {
  form: FormInstance;
  name: number;
  restField: any;
}
export const Content: FC<IProps> = ({ form, name, restField }) => {
  return (
    <Row>
      {form.getFieldValue("schema")[name]?.type === "TEXT" && (
        <Form.Item
          label={"Enter value text"}
          {...restField}
          name={[name, "value"]}
        >
          <Input placeholder="value" />
        </Form.Item>
      )}
      {form.getFieldValue("schema")[name]?.type === "NUMBER" && (
        <Form.Item label={"Enter Number"} {...restField} name={[name, "value"]}>
          <InputNumber placeholder="value" />
        </Form.Item>
      )}
    </Row>
  );
};
