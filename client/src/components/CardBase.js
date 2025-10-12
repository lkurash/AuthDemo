import LinkBase from "@/components/LinkBase";

export default function CardBase({ title, subtitle, form, actions }) {
  return (
    <section className="card" role="region" aria-labelledby="card-title">
      <h1 className="card-title" id="card-title">
        {title}
      </h1>
      {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
      <div className="card-body">{form}</div>
      <div className="card-footer">
        <span className="muted">{actions.title}</span>
        <LinkBase label={actions.label || "Sign in"} to={actions.link} />
      </div>
    </section>
  );
}
