import { SortingValues, Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { TaskListItem } from "./TaskListItem";

const TaskList = () => {
  const { tasks, areFinishedTasksHidden, importanceFilter, timeFilterState } =
    useTasks();

  const tasksSortedByTime = sortTasksByTime({
    tasks,
    value: timeFilterState
  });

  const tasksSortedByImportance = sortTasksByImportance({
    tasks: tasksSortedByTime,
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
  value: SortingValues;
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

interface SortByTimeProps {
  tasks: Task[];
  value: SortingValues;
}

function sortTasksByTime({ tasks, value }: SortByTimeProps): Task[] {
  if (value === "ascend") {
    return tasks.sort(
      (a, b) =>
        new Date(a.timeStamp).getTime() -
        new Date(b.timeStamp).getTime()
    );
  } else if (value === "descend") {
    return tasks.sort(
      (a, b) =>
        new Date(b.timeStamp).getTime() -
        new Date(a.timeStamp).getTime()
    );
  } else return tasks;
}
