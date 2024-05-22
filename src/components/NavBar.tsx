import { FishSymbol, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cc } from "../util/cc";
import { useActionOnOutsideClick } from "../hooks/useActionOnOutsideClick";

const LINKS = [
  { name: "Tasks", path: "/" },
  { name: "Rituals", path: "/rituals" },
  { name: "Statistics", path: "/statistics" },
  { name: "About", path: "/about" }
] as const;

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useActionOnOutsideClick(isMenuOpen, menuRef, () => setIsMenuOpen(false));

  return (
    <div className="sticky top-0 z-10 flex border-gray-500 bg-gray-500 text-slate-200">
      <nav className=" container bg-gray-500 p-4 flex justify-between items-center min-w-[300px] w-full  max-w-[850px]">
        {/*----Title------------------------- */}
        <div className="flex gap-2 items-center">
          <FishSymbol size={29} color="red" />
          <div className="text-slate-200 text-2xl font-bold">Like-Fish-DO</div>
        </div>
        {/* ----navigation--------------------------- */}
        <div className="hidden sm:flex space-x-4 text-xl">
          {LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className=" text-gray-200 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/*Menu Hamburg*/}
        <div className="sm:hidden relative " ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:text-white text-gray-200"
          >
            {isMenuOpen ? <X size={24} strokeWidth="3" /> : <Menu size={24} />}
          </button>
          <div
            className={cc(
              isMenuOpen ? "flex" : "hidden",
              "absolute right-0 w-32 origin-top-right flex-col bg-gray-500 border-2 border-gray-200 divide-y divide-gray-400 rounded-md  focus:outline-none "
            )}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className=" hover:text-white hover:bg-slate-600   focus:bg-slate-700 py-1 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
