"use client";

import { useEffect } from "react";
import CardBase from "@/components/CardBase";
import LinkBase from "@/components/LinkBase";
import LoginForm from "@/components/form/LoginForm";
import { ROUTES } from "@/helpers/routs";
import { useRouter } from "next/navigation";
import useOptionalUser from "@/hooks/useOptionalUser";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useOptionalUser();

  useEffect(() => {
    if (user) {
      router.replace(ROUTES.WELCOME);
    }
  }, [user, router]);

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
