"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/helpers/routs";
import { getUser } from "@/api/user";
import { logout } from "@/api/auth";
import LinkBase from "@/components/LinkBase";
import ButtonBase from "@/components/ButtonBase";
import Skeleton from "@/components/Skeleton";
import Error from "@/components/Error";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      const userInfo = await getUser();
      setUser(userInfo);
    } catch (e) {
      setError(e.message || "Not authorized");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
      <section className="home">
        <Skeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section className="home">
        <div className="home-card">
          <Error />
        </div>
      </section>
    );
  }

  return (
    <section className="home">
      <div className="home-hero">
        <div className="home-hello">
          <div className="pill">{greeting}</div>
          <h1 className="home-title">
            {user?.username || user?.email}, welcome back
          </h1>
          <p className="home-subtitle">
            Signed in as <strong>{user?.email}</strong>
          </p>
          <div className="home-actions">
            <ButtonBase fill onClick={onLogout}>
              Sign out
            </ButtonBase>
          </div>
        </div>
      </div>
    </section>
  );
}
