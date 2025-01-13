import { KeyboardEvent, useState } from "react";
import { JHInput } from "../../../core/ui/jh-input";
import clsx from "clsx";
import { Tag } from "./tag";

export const TodoCreateTags: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.trim() !== "") {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  return (
    <div>
      <label htmlFor="tags">{"태그"}</label>
      <ul
        className={clsx(
          "flex flex-wrap items-center border border-neutral-300 rounded-lg px-4 py-2  w-full focus-within:border-primary",
          {
            "gap-2": tags.length > 0,
          }
        )}
      >
        {tags.length > 0 &&
          tags.map((tag, index) => (
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
            onChange={handleTag}
            onKeyDown={handleAddTag}
            placeholder="태그를 입력하세요"
          />
        </li>
      </ul>
    </div>
  );
};