import React, { Fragment } from "react";
export type Option = {
  icon: any;
  label: string;
  value: string;
};
type Props = {
  options: Option[];
};
function ContactOptions({ options }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {options.map((option, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="gap-2 flex items-center">
            {option.icon}
            <label className="text-xs sm:text-base font-bold">
              {option.label}
            </label>
          </div>

          <label className="text-xs md:text-md lg:text-base">
            {option.value}
          </label>
        </div>
      ))}
    </div>
  );
}

export default ContactOptions;
