import Link from "next/link";
import { WelcomLogo } from "../../components/signup/logo";
import { PATH } from "../../core/path";
import SignInForm from "../../components/signin/sign-in-form";
import { NextPage } from "next";

const SignInPage: NextPage = () => {
  return (
    <main className="py-48 px-4">
      <div className="max-w-[520px] mx-auto">
        <WelcomLogo />
        <SignInForm />
        <Link className="block mt-6 text-center" href={PATH.signUp()}>
          {"회원이 아니신가요?"}
          <span className="underline text-blue-700 ml-1">{"회원가입하기"}</span>
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
