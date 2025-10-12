export default function ButtonBase({
  children,
  loading,
  fill,
  onClick,
  type = "button",
}) {
  return (
    <button
      className={`btn ${fill ? "fill" : ""}`}
      onClick={onClick}
      type={type}
      disabled={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
