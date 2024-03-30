import { Eye, EyeOff, FishSymbol, Hourglass } from "lucide-react";
import useTasks from "../hooks/useTasks";
import { FilterIconWrap } from "../UI/components/FilterIconWrap";
import { FilterDescAscIcon } from "./FilterDescAscIcon";

export function FilterBar() {
  const {
    areFinishedTasksHidden,
    filterFinishedTasks,
    filterByImportance,
    importanceFilter,
    timeFilterState,
    filterByTime
  } = useTasks();
  return (
    <div className="flex justify-between min-w-full border-y-2 border-gray-500 p-1">
      <div>Search task</div>

      <div className={`flex gap-3 `}>
        {/* ---Time-Filter-Icon------------------------------------------------------------ */}
        <FilterIconWrap inactiveWhen={timeFilterState === "none"}>
          {
            <FilterDescAscIcon
              currentValue={timeFilterState}
              onClick={filterByTime}
              title="Time filter"
            >
              <Hourglass size={22} color="navy" />
            </FilterDescAscIcon>
          }
        </FilterIconWrap>
        {/* ---Importance-Filter-Icon------------------------------------------------------------ */}
        <FilterIconWrap inactiveWhen={importanceFilter === "none"}>
          <FilterDescAscIcon
            currentValue={importanceFilter}
            onClick={filterByImportance}
            title="Importance filter"
          >
            <FishSymbol size={24} color="red" />
          </FilterDescAscIcon>
        </FilterIconWrap>
        {/* ---Hide-Finished-Tasks-Filter-Icon------------------------------------------------------------ */}
        <FilterIconWrap inactiveWhen={!areFinishedTasksHidden}>
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
        </FilterIconWrap>
      </div>
    </div>
  );
}
