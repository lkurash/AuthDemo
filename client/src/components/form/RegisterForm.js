"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputBase from "@/components/input/InputBase";
import InputPassword from "@/components/input/InputPassword";
import ButtonBase from "../ButtonBase";
import { ROUTES } from "@/helpers/routs";
import { register } from "@/api/authentication";
import {
  validateEmail,
  validateName,
  validatePasswords,
  validateRegisterForm,
} from "@/helpers/validators";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [errors, setErrors] = useState(null);

  const onRegister = async (form) => {
    try {
      const validationError = await validateRegisterForm(form);
      if (validationError) {
        setErrors(validationError);
        return;
      }

      const username = String(form.get("name"));
      const email = String(form.get("email"));
      const password = String(form.get("password"));
      console.log(33);

      await register(username, email, password);
      router.push(ROUTES.WELCOME);
    } catch (e) {
      setFormError(e.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    setErrors(null);
    setFormError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await onRegister(form);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <InputBase
        label="Name"
        id="name"
        name="name"
        type="text"
        placeholder="Your name"
        visibleError
        error={errors?.name}
      />
      <InputBase
        label="Email"
        id="email"
        name="email"
        type="email"
        visibleError
        error={errors?.email}
        placeholder="you@example.com"
      />
      <InputPassword
        label="Password"
        id="password"
        name="password"
        visibleError
        placeholder="••••••••"
        error={errors?.password}
      />
      <InputPassword
        label="Confirm password"
        id="confirm"
        name="confirm"
        placeholder="••••••••"
      />

      <ButtonBase loading={loading} fill type="submit">
        Create account
      </ButtonBase>
    </form>
  );
}
