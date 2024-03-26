import { Star } from "lucide-react";
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";

interface Props {
  task: Task;
}

export function StarAction({ task }: Props) {
  const { arrangeStarForTask } = useTasks();
  return (
    <div className="hover:scale-125">
      {task.star ? <div
        className="text-yellow-700 text-md"
        onClick={() => arrangeStarForTask(task)}
        title="Remove star"
      >
        <Star size={15} strokeWidth={3}/>
      </div> :
      <div
        className="text-gray-400 text-md"
        onClick={() => arrangeStarForTask(task)}
        title="Add star"

      >
        <Star size={15} />
      </div>}
    </div>
  );
}
