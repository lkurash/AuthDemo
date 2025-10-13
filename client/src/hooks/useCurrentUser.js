"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/helpers/routs";
import { getUser } from "@/api/user";

export default function useCurrentUser() {
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

  return { user, loading, error, setError, setUser, setLoading };
}
