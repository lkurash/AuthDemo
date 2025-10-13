"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { ROUTES } from "@/helpers/routs";
import { logout } from "@/api/authentication";
import Skeleton from "@/components/Skeleton";
import Contacts from "@/components/Contacts";
import Error from "@/components/Error";
import useCurrentUser from "@/hooks/useCurrentUser";
import WelcomeHero from "@/components/WelcomeHero";

export default function HomePage() {
  const router = useRouter();
  const { user, loading, error, setError } = useCurrentUser();

  const onLogout = async () => {
    try {
      await logout();
      router.push(ROUTES.LOGIN);
    } catch (e) {
      setError(e.message || "Failed to sign out");
    }
  };

  if (loading) {
    return (
      <section className="welcome">
        <div className="welcome-card">
          <Skeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="welcome">
        <div className="welcome-card">
          <Error />
        </div>
      </section>
    );
  }

  return (
    <div className="welcome-page">
      <div className="welcome-title">AuthDemo</div>
      <section className="welcome">
        <WelcomeHero user={user} onLogout={onLogout} />
        <Contacts />
      </section>
    </div>
  );
}
