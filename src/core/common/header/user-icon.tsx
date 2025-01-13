import { NextPage } from "next";
import { User } from "../../user/type";

interface UserIconProps {
  userInfo: User;
}

const UserIcon: React.FC<UserIconProps> = ({ userInfo }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-red-400 border-[3px] border-neutral-50">
        {userInfo.email.split("")[0]}
      </div>
      <span className="ml-3">{userInfo.nickname}</span>
    </div>
  );
};
export default UserIcon;
