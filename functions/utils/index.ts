import { Validation } from "@/types/typings";

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const convertValidationsToRules = (
  validations: Validation[],
  lang: string
) => {
  const rules: any = {};

  validations.forEach((validation) => {
    const { key } = validation;
    switch (key) {
      case "required":
        rules[key] = validation.label[lang];
        break;
      case "minLength":
        rules[key] = validation.label[lang];

        break;
      case "emailFormat":
        rules["pattern"] = {
          value: EMAIL_REGEX,
          message: validation.label[lang],
        };
        break;
      case "maxLength":
        rules[key] = validation.label[lang];
        break;
      // Add other cases as needed
    }
  });

  return rules;
};
