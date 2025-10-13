"use client";

import { useMemo } from "react";
import ButtonBase from "@/components/ButtonBase";

export default function WelcomeHero({ user, onLogout }) {
  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <div className="welcome-hero">
      <div className="welcome-hello">
        <div className="pill">{greeting}</div>
        <h1 className="hero-title">
          {greeting}, {user?.email}
        </h1>
        <p className="welcome-subtitle">Welcome to the AuthDemo</p>
        <div className="welcome-actions">
          <ButtonBase fill onClick={onLogout}>
            Logout
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}
