
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
          <label className="mb-1 text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <Fragment>
            {renderer ? (
              renderer(onChange, value)
            ) : (
          
              <input
                className={`px-4 py-3 rounded-lg border ${
                  error ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-trid-teal/50${
                  error ? " border-red-500" : ""
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
              className="text-red-500 text-sm mt-1"
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
