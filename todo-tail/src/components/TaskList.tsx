import useTasks from "../hooks/useTasks";
import { TaskListItem } from "./TaskListItem";

const TaskList = () => {
  const { tasks, areFinishedTasksHidden} = useTasks();

  const filteredTasks = areFinishedTasksHidden ? tasks.filter(task => !task.done) : tasks;
  return (
    <div className="container p-4 overflow-auto">
      <ul className="list-none p-2 divide-y-2 divide-dashed divide-slate-500 rounded-md">
        {filteredTasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
