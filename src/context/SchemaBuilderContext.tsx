import { Form, FormInstance } from "antd";
import React, { useContext, createContext, useState } from "react";

export interface ProviderProps {
  schemaBuilder: FormInstance | any;
  update: () => void;
  onFinish: (values: any) => void;
}
const SchemaBuilderContext = createContext<ProviderProps>({
  schemaBuilder: null,
  update: () => {},
  onFinish: () => {},
});

export const useSchemaBuilder = () => {
  if (!SchemaBuilderContext) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return useContext(SchemaBuilderContext);
};

export const SchemaBuilderProvider = ({ children }: any) => {
  const [schemaBuilder] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const update = () => {
    setIsUpdate(!isUpdate);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <SchemaBuilderContext.Provider
      value={{
        schemaBuilder,
        update,
        onFinish,
      }}
    >
      {children}
    </SchemaBuilderContext.Provider>
  );
};
