import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

type SelectFieldProps = FieldProps & {
  showEmptyOption?: boolean;
  options: Array<string | Record<string, unknown>>;
  getOptionLabel(option: string | Record<string, unknown>): string;
  getOptionValue(option: string | Record<string, unknown>): string;
};

export default function SelectField({
  showEmptyOption = false,
  options,
  getOptionLabel,
  getOptionValue,
  id,
  label,
  error,
  ...rest
}: SelectFieldProps & InputHTMLAttributes<HTMLSelectElement>): JSX.Element {
  return (
    <div className="field">
      <label htmlFor={id} className="label has-text-primary">
        {label}
      </label>
      <div className="control">
        <div className={clsx("select", { "is-danger": error })}>
          <select id={id} name={id} {...rest}>
            {showEmptyOption && <option />}
            {options.map((option) => (
              <option
                key={getOptionLabel(option)}
                value={getOptionValue(option)}
              >
                {getOptionLabel(option)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className={clsx("help is-danger")} aria-live="polite">
        {error}
      </p>
    </div>
  );
}
