import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";

interface Props {
  task: Task
}

export function TaskItem({task} : Props) {

  const { deleteTask, taskDone } = useTasks();
  return (
    <li key={task.id} className="flex flex-nowrap justify-between p-2">
    <span
      className={`${task.done && "line-through whitespace-break-spaces"}  `}
    >
      {task.name}
    </span>
    <div className="flex flex-nowrap">
      <button
        onClick={() => taskDone(task)}
        className="px-2 py-1 m-1 h-8 bg-green-700 text-white rounded-md"
      >
        Done
      </button>

      <button
        onClick={() => deleteTask(task)}
        className="px-2 py-1 m-1 h-8 bg-red-500 text-white rounded-md"
      >
        Delete
      </button>
    </div>
  </li>
  )
  
}
