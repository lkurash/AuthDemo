import Link from "next/link";
import { ROUTES } from "@/helpers/routs";

export default function Page() {
  return (
    <div className="home-card">
      <h1 className="home-title">Test assignment</h1>
      <p className="home-subtitle">Go to Home after signing in</p>
      <div className="home-actions">
        <Link href={ROUTES.LOGIN}>Sign in</Link>
        <Link href={ROUTES.REGISTER}>Register</Link>
        <Link href={ROUTES.WELCOME}>Home</Link>
      </div>
    </div>
  );
}
