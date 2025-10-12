"use client";

import { useEffect } from "react";
import CardBase from "@/components/CardBase";
import LinkBase from "@/components/LinkBase";
import LoginForm from "@/components/form/LoginForm";
import { ROUTES } from "@/helpers/routs";
import { useRouter } from "next/navigation";
import { getUser } from "@/api/user";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    getUser()
      .then(() => router.replace(ROUTES.WELCOME))
      .catch(() => {});
  }, []);

  return (
    <CardBase
      title="Sign in"
      subtitle="Welcome back!"
      form={<LoginForm />}
      actions={{
        title: "Don't have an account?",
        link: ROUTES.REGISTER,
        label: "Create account",
      }}
    />
  );
}
