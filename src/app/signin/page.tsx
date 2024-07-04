import Link from "next/link";
import { WelcomLogo } from "../../components/signup/logo";
import { PATH } from "../../core/path";

export const SignInPage = () => {
  return (
    <main className="py-48 px-4">
      <div className="max-w-[520px] mx-auto">
        <WelcomLogo />

        <Link className="block mt-6 text-center" href={PATH.signUp()}>
          {"회원이 아니신가요?"}
          <span className="underline text-blue-700 ml-1">{"회원가입하기"}</span>
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
