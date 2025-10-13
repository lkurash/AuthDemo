"use client";

import { useEffect } from "react";
import CardBase from "@/components/CardBase";
import InputBase from "@/components/input/InputBase";
import LinkBase from "@/components/LinkBase";
import RegisterForm from "@/components/form/RegisterForm";
import { ROUTES } from "@/helpers/routs";
import { useRouter } from "next/navigation";
import useOptionalUser from "@/hooks/useOptionalUser";

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useOptionalUser();

  useEffect(() => {
    if (user) {
      router.replace(ROUTES.WELCOME);
    }
  }, [user, router]);

  return (
    <CardBase
      title="Create account"
      subtitle="Sign up to get started"
      form={<RegisterForm />}
      actions={{
        title: "Already have an account?",
        link: ROUTES.LOGIN,
        label: "Sign in",
      }}
    />
  );
}
