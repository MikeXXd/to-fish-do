import { ReactNode } from "react";

// const COLORS = [
//     {green: 'bg-green-700 text-white'},
//     {lightGreen: 'bg-green-400 text-white'},
//     {red: 'bg-red-700 text-white' },
//     {lightRed: 'bg-red-400 text-white'},
//     {gray: 'bg-green-700 text-black'},
//     {lightGray: 'bg-green-400 text-black'}
// ] as const

type Color = {
  green: "bg-green-700 text-white";
  lightGreen: "bg-green-400 text-white";
  red: "bg-red-700 text-white";
  lightRed: "bg-red-400 text-white";
  gray: "bg-green-700 text-black";
  lightGray: "bg-green-400 text-black";
};

interface ButtoProps {
  children: ReactNode;
  color: Color;
}

export function Button({ color, children }: ButtoProps) {
  return (
    <button className={`${color} px-2 py-1 m-1 h-8 rounded-md`}>
      {children}
    </button>
  );
}
