"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/helpers/routs";
import { logout } from "@/api/authentication";
import useOptionalUser from "@/hooks/useOptionalUser";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, setUser, fetchUser } = useOptionalUser({
    watch: pathname,
  });
  const [optionalUser, setOptionalUser] = useState(null);

  useEffect(() => {
    setOptionalUser(user);
  }, [user]);

  const handleLogout = async () => {
    await logout();
    setOptionalUser(null);
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
          {loading ? (
            <div className="nav-loading" aria-hidden="true" />
          ) : !optionalUser ? (
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
