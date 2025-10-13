export default function Skeleton() {
  return (
    <div
      className="skeleton"
      role="status"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="skeleton-row">
        <div className="skeleton-block skeleton-block--avatar" />
        <div className="skeleton-block skeleton-block--meta">
          <div className="skeleton-block skeleton-block--title" />
          <div className="skeleton-block skeleton-block--line" />
          <div className="skeleton-block skeleton-block--line" />
        </div>
      </div>
    </div>
  );
}
