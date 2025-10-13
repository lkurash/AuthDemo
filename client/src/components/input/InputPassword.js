"use client";

import { useState } from "react";
import PasswordToggleIcon from "./PasswordToggleIcon";

export default function InputPassword({
  label,
  error,
  visibleError,
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const type = visible ? "text" : "password";

  return (
    <div className="field">
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <div className="input-wrap">
        <input className="input input-with-toggle" type={type} {...props} />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="input-toggle"
        >
          <PasswordToggleIcon visible={visible} />
        </button>
      </div>
      {visibleError ? (
        <p className="error-text" role="alert">
          {error ? error : null}
        </p>
      ) : null}
    </div>
  );
}
