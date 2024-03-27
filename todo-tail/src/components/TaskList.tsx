import useTasks from "../hooks/useTasks";
import { TaskListItem } from "./TaskListItem";

const TaskList = () => {
  const { tasks, areFinishedTasksHidden} = useTasks();

  const starFirstTasksSorted = tasks.sort((a, b) => (a.star === b.star ? 0 : a.star ? -1 : 1));

  const filteredTasks = areFinishedTasksHidden ? starFirstTasksSorted.filter(task => !task.done) : starFirstTasksSorted;


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
