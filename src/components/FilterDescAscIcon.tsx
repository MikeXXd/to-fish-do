import { ReactNode } from "react";
import { SortingValues } from "./Tasks/contexts/Task";

interface FilterProps {
  children: ReactNode;
  title: string;
  onClick: (value: SortingValues) => void;
  currentValue: SortingValues;
}

export function FilterDescAscIcon({
  children,
  title,
  onClick,
  currentValue
}: FilterProps) {
  return (
    <div className="hover:scale-125 transition-transform">
      {!currentValue && (
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
          onClick={() => onClick(undefined)}
          title={title}
        >
          {children}
        </div>
      )}
    </div>
  );
}
