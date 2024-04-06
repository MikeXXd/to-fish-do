import { FishSymbol, Menu } from "lucide-react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gray-500 p-4 flex justify-between">
      <div className="flex gap-2 items-center">
        <FishSymbol size={29} color="red" />
        <div className="text-white text-2xl font-bold">Like-Fish-DO</div>
      </div>

      {/*Menu Hamburg*/}
      <div className="md:hidden">
        <button className="text-white">
          <Menu size={24} />
        </button>
      </div>

      <div className="hidden md:flex space-x-4 text-xl">
        <Link to="/" className="text-white">
          Tasks
        </Link>
        <Link to="/rituals" className="text-white">
          Rituals
        </Link>
        <Link to="/statistics" className="text-white">
          Statistics
        </Link>
        <Link to="/about" className="text-white">
          About
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
