import { SquarePlus } from "lucide-react";

interface TitlePlusBtnProps {
  title: string;
  onClick: () => void;
}

export default function TitlePlusBtn({ title, onClick }: TitlePlusBtnProps) {
  return (
    <div className="relative">
      <h1 className="mt-6 text-4xl sm:text-3xl font-bold">{title}</h1>

      <button
        onClick={onClick}
        className="absolute mt-3 p-2 outline-none hover:scale-110 right-0 bottom-0 translate-x-16 translate-y-3 transition-transform"
        title="Add new task"
      >
        <SquarePlus size={40} strokeWidth={1} />
      </button>
    </div>
  );
}
