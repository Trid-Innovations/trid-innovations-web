"use client";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";

interface IInput {
  control: any;
  name: string;
  placeholder?: string;
  rules?: any;
  defaultValue?: string;
  label: string;
  required?: boolean;
  renderer?: any;
}
const Input = ({
  control,
  name,
  rules,
  defaultValue,
  label,
  renderer,
  required,
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
          <label>{required ? `${label}*` : label}</label>
          <Fragment>
            {renderer ? (
              renderer(onChange, value)
            ) : (
              <input
                style={{ borderColor: error ? "red" : "" }}
                className={`w-full trid__input leading-6 ${
                  error ? "border !border-tertiary-mars" : ""
                } m-0`}
                type="text"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          </Fragment>
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
