import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { JhButton } from "../../core/ui/jh-button";

interface ColumnEditDropDownProps {
  handleOpenEdit: () => void;
  handleOpenDelete: () => void;
}

export const ColumnEditDropdown: React.FC<ColumnEditDropDownProps> = ({
  handleOpenDelete,
  handleOpenEdit,
}) => {
  return (
    <Menu as={"div"}>
      <MenuButton className="p-2">
        <Cog6ToothIcon className="w-6 h-6 text-neutral-700" />
      </MenuButton>
      <MenuItems
        as="ul"
        transition
        anchor="bottom"
        className={
          "origin-top transition duration-200 ease-out data-[closed]:opacity-0 bg-neutral-50 text-neutral-700 p-2 rounded-md shadow-lg border border-neutral-200"
        }
      >
        <MenuItem
          as={"li"}
          className={
            "px-3 py-1.5 data-[focus]:bg-primary-light data-[focus]:text-primary data-[focus]:rounded-md data-[focus]:cursor-pointer"
          }
        >
          <JhButton onClick={handleOpenEdit} variants="reset">
            {"수정하기"}
          </JhButton>
        </MenuItem>
        <MenuItem
          as={"li"}
          className={
            "px-3 py-1.5 data-[focus]:bg-primary-light data-[focus]:text-primary data-[focus]:rounded-md data-[focus]:cursor-pointer"
          }
        >
          <JhButton variants="reset" onClick={handleOpenDelete}>
            {"삭제하기"}
          </JhButton>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
