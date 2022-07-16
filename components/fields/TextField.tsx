import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export default function TextField({
  id,
  label,
  error,
  ...rest
}: FieldProps & InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return (
    <div className="field">
      <label htmlFor={id} className="label has-text-primary">
        {label}
      </label>
      <div className="control">
        <input
          id={id}
          name={id}
          className={clsx("input", { "is-danger": error })}
          {...rest}
        />
      </div>
      <p className={clsx("help is-danger")} aria-live="polite">
        {error}
      </p>
    </div>
  );
}
