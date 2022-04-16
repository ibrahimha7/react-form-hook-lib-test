import { Button, Form, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Content } from "./components/Content";
import { SchemaMainBuilder } from "./components/SchemaMainBuilder";

export const FormBuilder = () => {
  const [schemaBuilder] = Form.useForm();
  const [toggelDetails, setToggelDetails] = useState(true);

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  function onChange() {
    setToggelDetails(!toggelDetails);
  }

  return (
    <>
      <Switch defaultChecked onChange={onChange} />

      <Form form={schemaBuilder} onFinish={onFinish}>
        <Form.List name={"schema"}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    //   border: "1px solid #d9d9d9",
                    borderRadius: "10px",
                    margin: "20px 5px",
                    padding: "20px 5px 0 5px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                  }}
                >
                  {toggelDetails && (
                    <SchemaMainBuilder
                      form={schemaBuilder}
                      name={name}
                      remove={remove}
                      restField={restField}
                      level={0}
                    />
                  )}
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
