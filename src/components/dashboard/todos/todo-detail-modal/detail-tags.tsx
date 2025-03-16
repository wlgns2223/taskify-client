import clsx from "clsx";
import { Todo } from "../../../../libs/dashboard/todo/dto/todo.dto";
import { colors } from "../tags";

interface TagsProps {
  columnName: string;
  tags: Todo["tags"];
}

export const DetailTags: React.FC<TagsProps> = ({ tags, columnName }) => {
  return (
    <div className="flex gap-5">
      <p className="px-2 py-1 bg-primary-light text-primary rounded-md text-xs">
        {columnName}
      </p>
      <div className="bg-neutral-200 h-6 w-[1px]" />
      <ul className="flex text-xs space-x-1">
        {tags.map((tag, idx) => {
          const { bg, txt } = colors[idx % colors.length];

          return (
            <li className={clsx(bg, txt, "px-2 py-1 rounded-md")} key={tag.id}>
              {tag.tag}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
