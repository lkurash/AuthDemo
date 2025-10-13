"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/helpers/routs";
import { getUser } from "@/api/user";
import { logout } from "@/api/authentication";

export default function Header() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;
    setLoaded(false);
    getUser()
      .then((user) => {
        if (mounted) setUser(user);
      })
      .catch(() => {
        if (mounted) setUser(null);
      })
      .finally(() => {
        if (mounted) setLoaded(true);
      });
    return () => {
      mounted = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push(ROUTES.LOGIN);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-left">
          <Link href={ROUTES.HOME} className="logo">
            AuthDemo
          </Link>
        </div>
        <nav className="nav">
          {!loaded ? (
            <div className="nav-loading" aria-hidden="true" />
          ) : !user ? (
            <>
              <Link href={ROUTES.LOGIN} className="nav-link btn small">
                Sign in
              </Link>
              <Link href={ROUTES.REGISTER} className="nav-link btn small">
                Register
              </Link>
            </>
          ) : (
            <button className="nav-link btn small" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
