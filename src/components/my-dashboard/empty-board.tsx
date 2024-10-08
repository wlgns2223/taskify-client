import NoInvitation from "@/../public/no-invitation.svg";
import Image from "next/image";

export const EmptyBoard: React.FC = () => {
  return (
    <div className="px-6 py-7 bg-white rounded-lg mt-10 min-h-[400px] max-w-5xl flex flex-col">
      <p className="text-xl md:text-2xl font-bold">{"초대받은 대시보드"}</p>
      <div className="flex flex-col items-center justify-center text-neutral-400 flex-1 ">
        <Image
          src={NoInvitation}
          alt="초대없음"
          className="w-16 h-16 md:w-[100px] md:h-[100px]"
        />
        <p className="mt-6 text-sm lg:text-lg">
          {"아직 초대받은 대시보드가 없어요"}
        </p>
      </div>
    </div>
  );
};
