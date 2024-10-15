import { JhButton } from "../../core/ui/jh-button";
import { JHInput } from "../../core/ui/jh-input";

const colors = [
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

export const DashboardCreateContent: React.FC = () => {
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
        />
      </div>
      <ul className="flex mt-6 -ml-3">
        {colors.map((color) => (
          <li key={color.hex} className="ml-3 cursor-pointer">
            <div
              style={{
                backgroundColor: color.hex,
              }}
              className="w-8 h-8 rounded-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
