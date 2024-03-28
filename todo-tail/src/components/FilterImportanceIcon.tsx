import { FishSymbol } from "lucide-react";
import useTasks from "../hooks/useTasks";

export function FilterImportanceIcon() {
  const { filterByImportance, importanceFilter } = useTasks();

  return (
    <>
      {importanceFilter === "none" && (
        <div onClick={filterByImportance}>
          <FishSymbol size={24} color="red" />
        </div>
      )}
      {importanceFilter === "descend" && (
        <div className="-rotate-45" onClick={filterByImportance}>
          <FishSymbol size={24} color="red" />
        </div>
      )}
      {importanceFilter === "ascend" && (
        <div className="rotate-45" onClick={filterByImportance}>
          <FishSymbol size={24} color="red" />
        </div>
      )}
    </>
  );
}
