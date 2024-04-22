import { useContext } from "react";
import { Context } from "../contexts/Task";

export function useTasks() {
  const value = useContext(Context);

  if (!value) {
    throw new Error("Please use this component inside TasksProvider");
  }

  return value;
}

export default useTasks;
