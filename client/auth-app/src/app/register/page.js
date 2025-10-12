import CardBase from "@/components/CardBase";
import InputBase from "@/components/input/InputBase";
import LinkBase from "@/components/LinkBase";
import RegisterForm from "@/components/form/RegisterForm";
import { ROUTES } from "@/helpers/routs";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
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
