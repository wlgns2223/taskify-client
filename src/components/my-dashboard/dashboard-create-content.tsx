import { Dispatch, MouseEvent, SetStateAction } from "react";
import { JHInput } from "../../core/ui/jh-input";
import { CreateDashBoardDtoSchema } from "../../libs/dashboard/createDashBoardDto";
import { CheckIcon } from "@heroicons/react/24/outline";
import { match } from "ts-pattern";

export const colors = [
  {
    color: "green",
    hex: "#7ac555",
  },
  {
    color: "purple",
    hex: "#760DDE",
  },
  {
    color: "orange",
    hex: "#FFA500",
  },
  {
    color: "skyblue",
    hex: "#76A5EA",
  },
  {
    color: "lightPink",
    hex: "#E876EA",
  },
];

interface DashboardCreateContentProps {
  dashboardCreateDto: CreateDashBoardDtoSchema;
  setDashBoardCreateDto: Dispatch<SetStateAction<CreateDashBoardDtoSchema>>;
}

export const DashboardCreateContent: React.FC<DashboardCreateContentProps> = ({
  dashboardCreateDto,
  setDashBoardCreateDto,
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDashBoardCreateDto({
      ...dashboardCreateDto,
      title: e.target.value,
    });
  };

  const handleColorChange = (
    e: MouseEvent<HTMLUListElement, globalThis.MouseEvent>
  ) => {
    const color = (e.target as HTMLElement).dataset.color;
    if (color) {
      setDashBoardCreateDto({
        ...dashboardCreateDto,
        color: color,
      });
    }
  };

  return (
    <div>
      <p className="text-2xl">{"새로운 대시보드"}</p>
      <div className="mt-9">
        <label htmlFor="dashboard-name" className="text-lg">
          {"대시보드 이름"}
        </label>
        <JHInput
          id="dashboard-name"
          placeholder="새로운 프로젝트"
          className="w-full mt-3"
          onChange={handleTitleChange}
        />
      </div>
      <ul className="flex mt-6 -ml-3" onClick={handleColorChange}>
        {colors.map((color) => (
          <li key={color.hex} className="ml-3 cursor-pointer">
            <div
              data-color={color.hex}
              style={{
                backgroundColor: color.hex,
              }}
              className="flex justify-center items-center w-8 h-8 rounded-full"
            >
              {match(dashboardCreateDto.color)
                .with(color.hex, () => (
                  <CheckIcon className="w-6 h-6 text-white" />
                ))
                .otherwise(() => null)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
