import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { MemberSchemaDto } from "../../../libs/member/dto/member.dto";
import { useEffect, useState } from "react";
import { useTodoCreateContext } from "../../../libs/dashboard/todo-create-context";

interface MemberListProps {
  members: MemberSchemaDto[];
}

export const MemberList: React.FC<MemberListProps> = ({ members }) => {
  const [selected, setSelected] = useState<MemberSchemaDto>(members[0]);
  const { setTodo } = useTodoCreateContext();

  useEffect(() => {
    setTodo((prev) => ({
      ...prev,
      assigneeUserId: selected.id.toString(),
    }));
  }, [selected]);

  return (
    <Field>
      <Label>{"담당자"}</Label>
      <Listbox
        as={"div"}
        className={"flex flex-col relative"}
        value={selected}
        onChange={setSelected}
      >
        <ListboxButton
          className={
            "flex px-4 py-2 pr-8 border border-neutral-200 rounded-md relative group"
          }
        >
          {selected.nickname}
          <ChevronUpIcon className="absolute top-1/2 -translate-y-1/2 right-2 w-4 h-4 group-data-[open]:rotate-180 transition-all" />
        </ListboxButton>
        <ListboxOptions
          className={" border border-neutral-200 rounded-md divide-y"}
        >
          {members.map((member) => (
            <ListboxOption
              className={"p-4 data-[focus]:bg-primary-light cursor-pointer "}
              key={member.id}
              value={member}
            >
              {member.nickname}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};
