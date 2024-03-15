import { Task } from "../App";

interface TaskListprops {
  tasks: Task[];
  onTaskDone: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskList = ({ tasks, onTaskDone, onDelete }: TaskListprops) => {
  return (
    <div className="container p-4 overflow-auto">
      <h3 className="text-lg font-bold">Tasks</h3>
      <ul className="list-none p-2 divide-y-2 divide-dashed divide-slate-500 rounded-md">
        {tasks.map((task) => (
          <li key={task.id} className="flex flex-nowrap justify-between p-2">
            <span
              className={`${
                task.done && "line-through whitespace-break-spaces"
              }  `}
            >
              {task.name}
            </span>
            <div className="flex flex-nowrap">
              <button
                onClick={() => onTaskDone(task)}
                className="px-2 py-1 m-1 h-8 bg-green-700 text-white rounded-md"
              >
                Done
              </button>

              <button
                onClick={() => onDelete(task)}
                className="px-2 py-1 m-1 h-8 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
