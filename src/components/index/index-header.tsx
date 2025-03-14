import Image from "next/image";
import logoText from "@/../public/logo-text.svg";
import Link from "next/link";
import { PATH } from "../../core/types/path";

const IndexHeader: React.FC = () => {
  return (
    <header className="bg-neutral-700 p-4 h-[70px] min-w-mobile">
      <div className="mx-auto max-w-pc flex items-center justify-between ">
        <Link href={"/"} className="">
          <Image src={logoText} alt="logo" />
        </Link>
        <div className="flex text-neutral-50">
          <Link href={PATH.signIn()}>{"로그인"}</Link>
          <Link className="ml-8" href={PATH.signUp()}>
            {"회원가입"}
          </Link>
        </div>
      </div>
    </header>
  );
};
export default IndexHeader;
