import { FishSymbol } from "lucide-react";
import { Importance } from "../constants";
import { cc } from "../util/cc";

interface Props {
  importance: Importance;
  size?: number;
}

export default function ImportanceIconFish({ importance, size = 24 }: Props) {
  return (
    <FishSymbol
      size={size}
      className={cc(
        "flex",
        importance === "high" && "-rotate-90 text-red-500",
        importance === "medium" && "-rotate-45 text-orange-400",
        importance === "low" && "text-blue-900"
      )}
    />
  );
}
