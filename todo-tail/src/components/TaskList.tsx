import { ImportanceFilter, Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { TaskListItem } from "./TaskListItem";

const TaskList = () => {
  const { tasks, areFinishedTasksHidden, importanceFilter } = useTasks();

  const tasksSortedByImportance = sortTasksByImportance({
    tasks,
    value: importanceFilter
  });

  const starFirstTasksSorted = tasksSortedByImportance.sort((a, b) =>
    a.star === b.star ? 0 : a.star ? -1 : 1
  );

  const filteredTasks = areFinishedTasksHidden
    ? starFirstTasksSorted.filter((task) => !task.done)
    : starFirstTasksSorted;

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

interface SortByImportanceProps {
  tasks: Task[];
  value: ImportanceFilter;
}

function sortTasksByImportance({
  tasks,
  value
}: SortByImportanceProps): Task[] {
  if (value === "ascend") {
    return tasks.sort((a, b) => a.importance - b.importance);
  } else if (value === "descend") {
    return tasks.sort((a, b) => b.importance - a.importance);
  } else return tasks;
}
