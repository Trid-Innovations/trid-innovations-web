import React from "react";
import { Controller } from "react-hook-form";

interface IInput {
  control: any;
  name: string;
  placeholder?: string;
  rules?: any;
  defaultValue?: string;
  label: string;
}
const Input = ({
  control,
  name,
  placeholder,
  rules,
  defaultValue,
  label,
}: IInput) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <div className="flex w-full flex-col gap-1 relative">
          <label className={`${error ? "text-tertiary-mars" : ""}`}>
            {label}
          </label>
          <input
            style={{ borderColor: error ? "red" : "" }}
            className={`trid__input leading-6 ${
              error ? "border !border-tertiary-mars" : ""
            } m-0`}
            type="text"
            value={value?.trim()}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={name}
          />

          {!!error && (
            <p
              className="text-tertiary-mars absolute -bottom-4"
              style={{ fontSize: "10px" }}
            >
              {error.message || "Error"}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default Input;
