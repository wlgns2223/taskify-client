import { MemberList } from "./member-list";
import { TodoTitleInput } from "./title-input";
import { TodoCreateContent } from "./content";
import { TodoCreateDatePicker } from "./date-picker";
import { TodoCreateTags } from "./tags";
import { ImageInput } from "./image-input";
import { MemberSchemaDto } from "../../../../libs/member/dto/member.dto";

interface TodoCreateModalProps {
  dashboardMembers: MemberSchemaDto[];
}

export const TodoCreateBody: React.FC<TodoCreateModalProps> = ({
  dashboardMembers,
}) => {
  return (
    <div>
      <p className="text-2xl">{"할 일 생성"}</p>
      <form className="mt-9 space-y-4">
        <MemberList members={dashboardMembers} />
        <TodoTitleInput />
        <TodoCreateContent />
        <TodoCreateDatePicker />
        <TodoCreateTags />
        <ImageInput />
      </form>
    </div>
  );
};
