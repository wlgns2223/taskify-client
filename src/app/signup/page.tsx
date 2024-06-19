import { NextPage } from "next";
import { WelcomLogo } from "../../components/signup/logo";
import { SignupForm } from "../../components/signup/signup-form";
import Link from "next/link";

const SignUpPage: NextPage = () => {
  return (
    <main className="py-48">
      <div className="max-w-[520px] mx-auto">
        <WelcomLogo />
        <SignupForm />
        <Link className="block mt-6 text-center" href={"login"}>
          {"이미 가입하셨나요?"}
          <span className="underline text-blue-700 ml-1">{"로그인하기"}</span>
        </Link>
      </div>
    </main>
  );
};
export default SignUpPage;
