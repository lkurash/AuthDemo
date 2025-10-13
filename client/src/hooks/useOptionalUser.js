"use client";

import { useEffect, useState, useCallback } from "react";
import { getUser } from "@/api/user";

export default function useOptionalUser({ watch = null } = {}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const u = await getUser();
      setUser(u);
      setError("");
    } catch (e) {
      setUser(null);
      setError(e.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const u = await getUser();
        if (mounted) setUser(u);
      } catch (e) {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [watch]);

  return { user, loading, error, setUser, fetchUser };
}
