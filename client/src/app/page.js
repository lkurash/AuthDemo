import Link from "next/link";
import { ROUTES } from "@/helpers/routs";

export default function Page() {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hello">
          <span className="pill">Auth demo</span>
        </div>
        <h1 className="home-title">Welcome</h1>
        <p className="home-subtitle">
          Sign in to continue, or create a new account to try the flow. You can
          also explore the demo Home screen.
        </p>
        <div className="home-actions">
          <Link className="btn fill" href={ROUTES.LOGIN}>
            Sign in
          </Link>
          <Link className="btn" href={ROUTES.REGISTER}>
            Create account
          </Link>
          <Link className="btn" href={ROUTES.WELCOME}>
            Welcome
          </Link>
        </div>
      </section>

      <section className="home-grid" aria-label="Quick overview">
        <article className="tile tile-accent">
          <h3>Why this project</h3>
          <div className="list">
            <div>• Simple auth with JWT + cookies</div>
            <div>• Clean forms with validation</div>
            <div>• Server + client tests</div>
          </div>
        </article>
        <article className="tile">
          <h3>Next steps</h3>
          <div className="list">
            <div>1. Sign in or register</div>
            <div>2. Visit Home page</div>
            <div>3. Explore protected routes</div>
          </div>
        </article>
      </section>
    </div>
  );
}
