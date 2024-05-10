import {
  EllipsisVertical,
  FishSymbol,
  Pencil,
  Trash2,
  BarChart4,
  ShieldX
} from "lucide-react";
import { useEffect, useState } from "react";
import { Ritual } from "../contexts/Ritual";
import useRituals from "../hooks/useRituals";
import { cc } from "../../../util/cc";

const ICON_SIZE = 27;

export default function RitualsListItem({ ritual }: { ritual: Ritual }) {
  const [isRitualMenuOpen, setIsRitualMenuOpen] = useState(false);
  const [isRitualDeleting, setIsRitualDeleting] = useState(false); // showing JSX deleting state
  const [isCursorInThisElement, setIsCursorInThisElement] = useState(false); //for closing menu
  const { deleteRitual } = useRituals();

  console.log("isCursorInThisElement", isCursorInThisElement);

  // --automatically closing menu 2s after mouseLeave
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isRitualMenuOpen && !isCursorInThisElement) {
        setIsRitualMenuOpen(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRitualMenuOpen, isCursorInThisElement]);

  // --JSX--deleting-state---------------------------------------------------------
  if (isRitualDeleting) {
    return (
      <li className="mx-2 bg-red-200 rounded-md hover:bg-red-300 transition-all border-red-500 border-2">
        <div className="flex justify-between gap-5 p-2  mx-auto font-semibold text-lg ">
          <button
            onClick={() => deleteRitual(ritual)}
            className="hover:scale-125"
          >
            <Trash2 size={ICON_SIZE} />
          </button>
          <span className="font-bold text-ellipsis overflow-hidden flex align-middle">
            {ritual.title}
          </span>
          <div className=" flex justify-between">
            <button
              onClick={() => setIsRitualDeleting(false)}
              className="`text-red-700 hover:scale-125"
              title="Cancel deleting"
            >
              <ShieldX size={ICON_SIZE} />{" "}
            </button>
          </div>
        </div>
      </li>
    );
  }

  // --JSX--non-deleting-state-------------------------------------------------------
  else
    return (
      <li
        onMouseEnter={() => setIsCursorInThisElement(true)} // for closing menu
        onMouseLeave={() => setIsCursorInThisElement(false)} // for closing menu
        className={cc(
          "grid grid-cols-10 gap-2 mx-2 bg-slate-200 rounded-md hover:bg-slate-100 transition-all",
          isRitualMenuOpen
            ? "border-2 border-orange-400"
            : "border-transparent border-2"
        )}
      >
        {/* --left-side---title-------------------------------- */}
        <div className=" p-2 col-span-8 sm:col-span-4 md:col-span-3 mx-auto font-semibold text-2xl sm:text-lg">
          {ritual.title}
        </div>{" "}
        {/* ----right-side---description and icons------------------------------ */}
        <div
          className={`col-span-2 sm:col-span-6 md:col-span-7 flex justify-end items-center sm:justify-between gap-3 `}
        >
          <div
            className="hidden sm:block overflow-hidden px-1"
            title={ritual.description}
          >
            {/* truncate description, it should never render in more then 2 lines*/}
            {ritual.description.length > 21
              ? `${ritual.description.slice(0, isRitualMenuOpen ? 35 : 70)}...`
              : ritual.description}
          </div>
          {!isRitualMenuOpen ? (
            //----- menu close -------------------------------------------------------
            <div className="flex items-center gap-1">
              {" "}
              <FishSymbol
                size={ICON_SIZE}
                className={cc(
                  "flex",
                  ritual.importance === "high" && "-rotate-90 text-red-500",
                  ritual.importance === "medium" &&
                    "-rotate-45 text-orange-400",
                  ritual.importance === "low" && "text-blue-900"
                )}
              />
              <button
                onClick={() => setIsRitualMenuOpen(true)}
                className="hover:scale-125 transition-transform"
              >
                <EllipsisVertical
                  size={ICON_SIZE}
                  className="text-gray-500 hover:text-black "
                />
              </button>
            </div>
          ) : (
            //------ menu open ----------------------------------------------------------
            <div className="flex gap-3 z-10 bg-slate-300 rounded-md p-1 ps-3 me-1 border-2 border-orange-400">
              <button
                onClick={() => {
                  setIsRitualMenuOpen(false);
                  setIsRitualDeleting(true);
                }}
                className=" hover:scale-125 transition-transform"
              >
                <Trash2
                  size={ICON_SIZE}
                  className="text-red-700 hover:text-red-500 "
                />
              </button>

              <button
                onClick={() => setIsRitualMenuOpen(false)}
                className="hover:scale-125 transition-transform"
              >
                <BarChart4
                  size={ICON_SIZE}
                  className="text-gray-800 hover:text-black"
                />
              </button>
              <button
                onClick={() => setIsRitualMenuOpen(false)}
                className="hover:scale-125 transition-transform"
              >
                <Pencil
                  size={ICON_SIZE}
                  className="text-gray-800 hover:text-black"
                />
              </button>
              <button
                onClick={() => setIsRitualMenuOpen(false)}
                className="hover:scale-125 transition-transform"
              >
                <EllipsisVertical
                  size={ICON_SIZE}
                  className={"text-gray-500 hover:text-black"}
                />
              </button>
            </div>
          )}
        </div>
      </li>
    );
}
