export default function Error({ message }) {
  return (
    <div className="error">
      <p className="error-message">
        {message ? message : "Uupps, something went wrong"}
      </p>
    </div>
  );
}
