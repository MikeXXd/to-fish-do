import { FishSymbol } from "lucide-react";
import useTasks from "../hooks/useTasks";

export function FilterImportanceIcon() {
  const { filterByImportance, importanceFilter } = useTasks();

  return (
    <div className="hover:scale-125">
      {importanceFilter === "none" && (
        <div
          onClick={() => filterByImportance("descend")}
          title="sort importance - descend"
        >
          <FishSymbol size={24} color="red" />
        </div>
      )}
      {importanceFilter === "descend" && (
        <div
          className="-rotate-45"
          onClick={() => filterByImportance("ascend")}
          title="sort importance - ascend"
        >
          <FishSymbol size={24} color="red" />
        </div>
      )}
      {importanceFilter === "ascend" && (
        <div
          className="rotate-45"
          onClick={() => filterByImportance("none")}
          title=" turn off sorting by importance"
        >
          <FishSymbol size={24} color="red" />
        </div>
      )}
    </div>
  );
}
