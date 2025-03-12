import clsx from "clsx";
import { Todo } from "../../../libs/dashboard/todo/dto/todo.dto";

interface TagsProps {
  tags: Todo["tags"];
}

const colors = [
  {
    bg: "bg-[#F9EEE3]",
    txt: "text-[#D58D49]",
  },
  {
    bg: "bg-[#E7F7DB]",
    txt: "text-[#86D549]",
  },
  {
    bg: "bg-[#F7DBF0]",
    txt: "text-[#D549B6]",
  },
  {
    bg: "bg-[#DBE6F7]",
    txt: "text-[#4981D5]",
  },
];

export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <ul className="flex gap-1 text-xs flex-wrap ">
      {tags.slice(0, 10).map((tag, idx) => {
        const { bg, txt } = colors[idx % colors.length];

        return (
          <li key={tag.id}>
            <p className={clsx("py-1 px-2 rounded-md", txt, bg)}>{tag.tag}</p>
          </li>
        );
      })}
      {tags.length > 10 && (
        <li>
          <span>{"..."}</span>
        </li>
      )}
    </ul>
  );
};
