import { Eye, EyeOff } from "lucide-react";
import useTasks from "../hooks/useTasks";
import { FilterImportanceIcon } from "./FilterImportanceIcon";

export function FilterBar() {
  const { areFinishedTasksHidden, filterFinishedTasks } = useTasks();
  return (
    <div className="flex justify-between min-w-full border-y-2 border-gray-500 p-1">
      <div>Search task</div>

      <div className="flex gap-2">
        <FilterImportanceIcon />
        <div onClick={filterFinishedTasks}>
          {areFinishedTasksHidden ? (
            <div
              className="text-orange-500 hover:scale-125"
              title="Show finished tasks"
            >
              <EyeOff size={24} />
            </div>
          ) : (
            <div
              className="text-green-700 hover:scale-125"
              title="Hide finished tasks"
            >
              <Eye size={24} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
