import { Eye, EyeOff, FishSymbol, Hourglass, X } from "lucide-react";
import useTasks from "../hooks/useTasks";
import { FilterComponentWrap } from "./FilterComponentWrap";
import { FilterDescAscIcon } from "../../FilterDescAscIcon";

interface FilterBarProps {
  onChange: (search: string) => void;
  searchName: string;
}

export function FilterBar({ searchName, onChange }: FilterBarProps) {
  const {
    areFinishedTasksHidden,
    filterFinishedTasks,
    filterByImportance,
    importanceFilter,
    timeFilterState,
    filterByTime
  } = useTasks();

  return (
    <div className="flex justify-between items-center min-w-full border-y-2 border-gray-500 p-1">
      <div>
        <FilterComponentWrap inactiveWhen={!searchName}>
          <div>
            <label htmlFor="search" className="sr-only">
              Search name
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                value={searchName}
                placeholder="Search task"
                onChange={(e) => onChange(e.target?.value)}
                name="search"
                id="search"
                className="bg-slate-100 block w-full rounded-md border-1 py-1 px-2 me-2 text-gray-900 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Clear search field
                </label>
                {searchName && (
                  <button
                    className="p-1 text-gray-500 hover:text-black border-s  border-black"
                    onClick={() => onChange("")}
                  >
                    <X />
                  </button>
                )}
              </div>
            </div>
          </div>
        </FilterComponentWrap>
      </div>

      <div className={`flex gap-3 `}>
        {/* ---Time-Filter-Icon------------------------------------------------------------ */}
        <FilterComponentWrap inactiveWhen={!timeFilterState}>
          {
            <FilterDescAscIcon
              currentValue={timeFilterState}
              onClick={filterByTime}
              title="Time filter"
            >
              <Hourglass size={22} color="navy" />
            </FilterDescAscIcon>
          }
        </FilterComponentWrap>
        {/* ---Importance-Filter-Icon------------------------------------------------------------ */}
        <FilterComponentWrap inactiveWhen={!importanceFilter}>
          <FilterDescAscIcon
            currentValue={importanceFilter}
            onClick={filterByImportance}
            title="Importance filter"
          >
            <FishSymbol size={24} color="red" />
          </FilterDescAscIcon>
        </FilterComponentWrap>
        {/* ---Hide-Finished-Tasks-Filter-Icon------------------------------------------------------------ */}
        <FilterComponentWrap inactiveWhen={!areFinishedTasksHidden}>
          <div onClick={filterFinishedTasks}>
            {areFinishedTasksHidden ? (
              <div
                className="text-orange-500 hover:scale-125 transition-transform"
                title="Show finished tasks"
              >
                <EyeOff size={24} />
              </div>
            ) : (
              <div
                className="text-green-700 hover:scale-125 transition-transform"
                title="Hide finished tasks"
              >
                <Eye size={24} />
              </div>
            )}
          </div>
        </FilterComponentWrap>
      </div>
    </div>
  );
}
