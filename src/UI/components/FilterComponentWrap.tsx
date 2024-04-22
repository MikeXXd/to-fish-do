import { ReactNode } from "react";

interface FilterIconWrapProps {
  children: ReactNode;
  inactiveWhen: boolean | undefined | null;
}

export function FilterComponentWrap({
  children,
  inactiveWhen
}: FilterIconWrapProps) {
  return (
    <div
      className={`border-y-2 border-dashed p-2 ${inactiveWhen ? "border-transparent" : "border-gray-500"}`}
    >
      {children}
    </div>
  );
}
