import { useContext } from "react";
import { Context } from "../contexts/Ritual";

export function useTasks() {
  const value = useContext(Context);

  if (!value) {
    throw new Error("Please use this component inside RitualProvider");
  }

  return value;
}

export default useTasks;
