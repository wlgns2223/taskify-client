import logo from "@/../public/logo.svg";
import Taskify from "@/../public/taskify.svg";
import Image from "next/image";

export const WelcomLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        className="w-24 h-auto sm:w-auto   fill-primary"
        src={logo}
        alt="logo"
      />
      <Image
        className="w-32 h-auto sm:w-auto fill-primary mt-4 sm:mt-8"
        src={Taskify}
        alt="service name"
      />
      <p className="text-xl text-neutral-700 pt-2">
        {"오늘도 만나서 반가워요!"}
      </p>
    </div>
  );
};
