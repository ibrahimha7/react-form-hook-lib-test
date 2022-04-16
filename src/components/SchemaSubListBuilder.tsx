import { Button, Col, Form, FormInstance, Row } from "antd";
import { FC, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { SchemaMainBuilder } from "./SchemaMainBuilder";
import { Content } from "./Content";
import { useSchemaBuilder } from "../context/SchemaBuilderContext";

interface IProps {
  form: FormInstance;
  OriginalName: number;
  restField: any;
  remove?: (name: number) => void;
  update: () => void;
  level: number;
}

export const SchemaSubListBuilder: FC<IProps> = ({
  form,
  OriginalName,
  update,
  level,
}) => {
  // const [isUpdate, setIsUpdate] = useState(false);
  // const update = () => {
  //   setIsUpdate(!isUpdate);
  // };
  return (
    <Row gutter={[16, 16]} justify={"end"}>
      <Col span={22}>
        <Form.List name={[OriginalName, "schema"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    //   border: "1px solid #d9d9d9",
                    borderRadius: "10px",
                    margin: "20px 5px",
                    padding: "20px 0px 0 20px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                  }}
                >
                  <SchemaMainBuilder
                    form={form}
                    name={name}
                    remove={remove}
                    restField={restField}
                    level={level + 1}
                  />

                  {/* <Content form={form} name={name} restField={restField} /> */}
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                    update();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Col>
    </Row>
  );
};
