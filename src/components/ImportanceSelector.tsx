/* eslint-disable react-hooks/exhaustive-deps */
import { FishSymbol } from "lucide-react";
import { useEffect, useState } from "react";
import useTasks from "./Tasks/hooks/useTasks";
import { Task } from "./Tasks/contexts/Task";

interface Props {
  onNewTask?: (importance: number) => void;
  task?: Task;
}

export function ImportanceSelector({ onNewTask, task }: Props) {
  const [value, setValue] = useState(task?.importance || 1);

  const { setTaskImportance, filterByImportance } = useTasks();

  useEffect(() => {
    if (task && task.importance !== value) {
      setTaskImportance(task.id, value);
    }
  }, [value]);

  useEffect(() => {
    onNewTask && onNewTask(value);
  }, [value, onNewTask]);

  function handleAddImportance() {
    filterByImportance(undefined);
    if (value <= 4) setValue(value + 1);
    else return;
  }

  function handleLessImportance() {
    filterByImportance(undefined);
    if (value > 1) setValue(value - 1);
    else return;
  }
  return (
    <div className="ms-1 flex ">
      <div className="hover:scale-125" title="increase importance">
        <FishSymbol color="red" size={15} onClick={handleAddImportance} />
      </div>
      {Array.from({ length: value - 1 }, (_, index) => (
        <div
          key={index}
          className="hover:scale-125"
          title="decrease importance"
        >
          <FishSymbol color="red" size={15} onClick={handleLessImportance} />
        </div>
      ))}
    </div>
  );
}
