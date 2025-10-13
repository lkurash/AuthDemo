"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/helpers/routs";
import { getUser } from "@/api/user";
import { logout } from "@/api/authentication";
import LinkBase from "@/components/LinkBase";
import ButtonBase from "@/components/ButtonBase";
import Skeleton from "@/components/Skeleton";
import Contacts from "@/components/Contacts";
import Error from "@/components/Error";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getUserInfo = async () => {
      try {
        const userInfo = await getUser();
        if (mounted) setUser(userInfo);
      } catch (e) {
        router.replace(ROUTES.LOGIN);
        setError(e.message || "Failed to fetch user");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getUserInfo();

    return () => {
      mounted = false;
    };
  }, [router]);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

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
        <Contacts />
      </section>
    </div>
  );
}
