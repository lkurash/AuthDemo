"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/helpers/routs";
import { login } from "@/api/auth";
import InputBase from "@/components/input/InputBase";
import InputPassword from "@/components/input/InputPassword";
import ButtonBase from "@/components/ButtonBase";
import { validateEmail } from "@/helpers/validators";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = async (form) => {
    try {
      const email = String(form.get("email"));
      const password = String(form.get("password"));
      const emailError = validateEmail(email);
      if (emailError) {
        setError({ email: emailError });
        setLoading(false);
        return;
      }
      await login(email, password);
      router.push(ROUTES.WELCOME);
    } catch (e) {
      setError({ form: e.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(e) {
    setError(null);
    setLoading(true);
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    await onLogin(form);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <InputBase
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        visibleError
        error={error?.email}
      />
      <InputPassword
        label="Password"
        id="password"
        name="password"
        placeholder="••••••••"
      />
      <div className="error-form">{error?.form ? error.form : null}</div>

      <ButtonBase loading={loading} fill type="submit">
        Sign in
      </ButtonBase>
    </form>
  );
}
