import { KeyboardEvent, useRef, useState } from "react";
import { JHInput } from "../../../../core/ui/jh-input";
import clsx from "clsx";
import { Tag } from "./tag";
import { useTodoCreateContext } from "../../../../libs/dashboard/todo/todo-create-context";

export const TodoCreateTags: React.FC = () => {
  const { setTodo, todo } = useTodoCreateContext();
  const [tag, setTag] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.trim() !== "") {
      const tagSet = Array.from(new Set([...todo.tags, tag]));
      setTodo((prev) => ({
        ...prev,
        tags: tagSet,
      }));
      setTag("");
    }
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <label htmlFor="tags">{"태그"}</label>
      <ul
        onClick={handleFocus}
        className={clsx(
          "flex flex-wrap items-center border border-neutral-300 rounded-lg px-4 py-2  w-full focus-within:border-primary",
          {
            "gap-2": todo.tags.length > 0,
          }
        )}
      >
        {todo.tags.length > 0 &&
          todo.tags.map((tag, index) => (
            <li key={`${tag}-${index}`}>
              <Tag>{tag}</Tag>
            </li>
          ))}

        <li>
          <JHInput
            id="tags"
            variant="reset"
            className="outline-none rounded-lg h-[30px]"
            value={tag}
            ref={inputRef}
            onChange={handleTag}
            onKeyDown={handleAddTag}
            placeholder="태그를 입력하세요"
          />
        </li>
      </ul>
    </div>
  );
};
