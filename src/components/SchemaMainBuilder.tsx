import {
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { FC, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { SchemaSubListBuilder } from "./SchemaSubListBuilder";
import { useSchemaBuilder } from "../context/SchemaBuilderContext";
import { Content } from "./Content";

interface IProps {
  form: FormInstance;
  name: number;
  restField: any;
  remove: (name: number) => void;
  level: number;
}

export const SchemaMainBuilder: FC<IProps> = ({
  form,
  name,
  restField,
  remove,
  level,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const update = () => {
    setIsUpdate(!isUpdate);
  };

  console.log("restField", restField);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={2}>
          <Form.Item {...restField} name={[name, "order"]}>
            <InputNumber min={0} placeholder="Order" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item {...restField} name={[name, "name"]}>
            <Input placeholder="Name" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item {...restField} name={[name, "type"]}>
            <Select placeholder="select type" onChange={update}>
              <Select.Option value="TEXT">Text</Select.Option>
              <Select.Option value="NUMBER">Number</Select.Option>
              <Select.Option value="IMAGE">image</Select.Option>
              <Select.Option value="SCHEMA">Schema</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        {form.getFieldValue("schema")[name]?.type === "SCHEMA" && (
          <>
            <Col span={4}>
              <Form.Item {...restField} name={[name, "schemaType"]}>
                <Select placeholder="select template" onChange={update}>
                  <Select.Option value="OBJECT">
                    Object (Single element)
                  </Select.Option>
                  <Select.Option value="LIST">List</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item {...restField} name={[name, "template"]}>
                <Select placeholder="select template" onChange={update}>
                  {form.getFieldValue("schema")[name]?.schemaType === "LIST" ? (
                    <>
                      <Select.Option value="GRID">Grid</Select.Option>
                      <Select.Option value="LIST">List</Select.Option>
                      <Select.Option value="HESROSECTION">
                        Herosection
                      </Select.Option>
                    </>
                  ) : (
                    <>
                      <Select.Option value="ARTICLE">Article</Select.Option>
                      <Select.Option value="HESROSECTION">
                        Herosection
                      </Select.Option>
                    </>
                  )}
                </Select>
              </Form.Item>
            </Col>
          </>
        )}
        <Col span={1}>
          <CloseOutlined
            onClick={() => remove(name)}
            style={{ color: "red" }}
          />
        </Col>
      </Row>

      {form.getFieldValue("schema")[name]?.schemaType === "LIST" && (
        <SchemaSubListBuilder
          form={form}
          OriginalName={name}
          restField={restField}
          remove={remove}
          update={update}
          level={level}
        />
      )}

      <Divider />
      <Content form={form} name={name} restField={restField} />
    </>
  );
};
