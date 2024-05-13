import { ReactNode } from "react";

interface RadioProps {
  id: string;
  children: ReactNode;
  name: string;
  value: number;
  defaultChecked: boolean;
}

export default function Radio({
  id,
  children,
  name,
  defaultChecked,
  value
}: RadioProps) {
  return (
    <div className="flex flex-col items-center justify-start gap-2">
      <input
        className="peer cursor-pointer border-2 border-transparent transition-all duration-300 ease-in-out checked:bg-transparent checked:border-blue-500 hover:border-blue-500 size-5 rounded-md" // Added rounded-full class
        id={id}
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
      />
      <label
        className="font-medium transition-all duration-300 ease-in-out text-xs whitespace-nowrap  hover:cursor-pointer"
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
}
