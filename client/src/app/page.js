"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/helpers/routs";
import useOptionalUser from "@/hooks/useOptionalUser";

export default function Page() {
  const { user, loading } = useOptionalUser();

  return (
    <div className="main container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="welcome-title">Secure authentication made simple</h1>
          <p className="welcome-subtitle">
            Try a demo of sign up, sign in, and protected routes. Built with
            JWT, cookies and clear validation.
          </p>
          <div className="welcome-actions">
            {loading ? null : user ? (
              <>
                <Link className="btn" href={ROUTES.WELCOME}>
                  Visit Welcome Page
                </Link>
              </>
            ) : (
              <>
                <Link className="btn fill" href={ROUTES.REGISTER}>
                  Create account
                </Link>
                <Link className="btn" href={ROUTES.LOGIN}>
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      <article className="tile">
        <h3>How to explore</h3>
        <div className="list">
          <div>1. Register an account</div>
          <div>2. Sign in and visit the Welcome page</div>
          <div>3. Inspect protected API responses</div>
        </div>
      </article>
      <section className="features">
        <article className="tile tile-accent">
          <h3>What you get</h3>
          <div className="list">
            <div>• Simple and secure auth flow</div>
            <div>• Server and client validation</div>
            <div>• Tests and example routes</div>
          </div>
        </article>
        <article className="tile">
          <h3>Tech</h3>
          <div className="list">
            <div>• React</div>
            <div>• Node + Express</div>
            <div>• JWT + cookies</div>
          </div>
        </article>
      </section>
    </div>
  );
}
