import CardBase from "@/components/CardBase";
import LinkBase from "@/components/LinkBase";
import LoginForm from "@/components/form/LoginForm";
import { ROUTES } from "@/helpers/routs";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
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
