import { NextPage } from "next";
import { WelcomLogo } from "../../components/signup/logo";
import { SignupForm } from "../../components/signup/signup-form";

const SignUpPage: NextPage = () => {
  return (
    <main className="py-48">
      <div className="max-w-[520px] mx-auto">
        <WelcomLogo />
        <SignupForm />
      </div>
    </main>
  );
};
export default SignUpPage;
