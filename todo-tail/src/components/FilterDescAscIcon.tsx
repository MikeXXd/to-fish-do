import { ReactNode } from "react";
import { ImportanceFilter } from "../contexts/Task";

interface FilterProps {
  children: ReactNode;
  title: string;
  onClick: (value: ImportanceFilter) => void;
  currentValue: ImportanceFilter;
}

export function FilterDescAscIcon({
  children,
  title,
  onClick,
  currentValue
}: FilterProps) {
  return (
    <div className="hover:scale-125">
      {currentValue === "none" && (
        <div onClick={() => onClick("descend")} title={title}>
          {children}
        </div>
      )}
      {currentValue === "descend" && (
        <div
          className="-rotate-45"
          onClick={() => onClick("ascend")}
          title={title}
        >
          {children}
        </div>
      )}
      {currentValue === "ascend" && (
        <div
          className="rotate-45"
          onClick={() => onClick("none")}
          title={title}
        >
          {children}
        </div>
      )}
    </div>
  );
}
