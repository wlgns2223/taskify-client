import { User } from "../../user/type";
import { BaseHeader, BaseHeaderProps } from "./base-header";
import UserIcon from "./user-icon";

interface BasicHeaderProps extends BaseHeaderProps {
  userInfo: User;
  headerText: string;
}

export const BasicHeader: React.FC<BasicHeaderProps> = ({
  userInfo,
  headerText,
}) => {
  return (
    <BaseHeader>
      <div className="flex justify-between items-center w-full">
        <span>{headerText}</span>
        <div className="flex">
          <UserIcon userInfo={userInfo} />
        </div>
      </div>
    </BaseHeader>
  );
};
