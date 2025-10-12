export default function InputBase({ label, error, visibleError, ...props }) {
  return (
    <div className="field">
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <input className="input" {...props} />
      {visibleError ? (
        <p className="error-text" role="alert">
          {error ? error : null}
        </p>
      ) : null}
    </div>
  );
}
