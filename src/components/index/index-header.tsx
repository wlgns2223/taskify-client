import Image from "next/image";
import logo from "@/../public/logo.svg";
import Link from "next/link";

const IndexHeader: React.FC = () => {
  return (
    <header className="bg-neutral-700 p-4 h-[70px] min-w-mobile">
      <div className="mx-auto max-w-pc flex items-center justify-between ">
        <Link href={"/"} className="">
          <Image src={logo} alt="logo" />
        </Link>
        <div className="flex text-neutral-50">
          <Link href={"/login"}>{"로그인"}</Link>
          <Link className="ml-8" href={"/signup"}>
            {"회원가입"}
          </Link>
        </div>
      </div>
    </header>
  );
};
export default IndexHeader;
