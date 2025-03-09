import { Todo } from "../../../libs/dashboard/todo/dto/todo.dto";

interface TagsProps {
  tags: Todo["tags"];
}

export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <ul className="flex gap-1 text-xs text-red-700 flex-wrap">
      {tags.slice(0, 10).map((tag) => (
        <li key={tag.id}>
          <p className="py-1 px-2 bg-red-400 rounded-md">{tag.tag}</p>
        </li>
      ))}
      {tags.length > 10 && (
        <li>
          <span>{"..."}</span>
        </li>
      )}
    </ul>
  );
};
