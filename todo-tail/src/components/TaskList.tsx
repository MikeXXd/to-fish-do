import useTasks from "../hooks/useTasks";
import { TaskListItem } from "./TaskListItem";

const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <div className="container p-4 overflow-auto">
      <h3 className="text-lg font-bold">Tasks</h3>
      <ul className="list-none p-2 divide-y-2 divide-dashed divide-slate-500 rounded-md">
        {tasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
