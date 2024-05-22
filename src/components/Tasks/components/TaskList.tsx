import { SortingValues, Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { TaskListItem } from "./TaskListItem";

interface TaskListProps {
  searchName: string;
}

const TaskList = ({ searchName }: TaskListProps) => {
  const { tasks, areFinishedTasksHidden, importanceFilter, timeFilterState } =
    useTasks();

  const tasksFilteredByName = filterBySearchedName<Task>(tasks, searchName);

  const tasksSortedByTime = sortTasksByTime({
    tasks: tasksFilteredByName,
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
    <div className="container overflow-auto px-auto">
      <ul className="list-none divide-y-2 divide-dashed divide-slate-500 rounded-md transition-all ease-in-out duration-300">
        {filteredTasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

// --supporting functions------------------------------------------------
interface SortByImportanceProps {
  tasks: Task[];
  value: SortingValues;
}

function sortTasksByImportance({
  tasks,
  value
}: SortByImportanceProps): Task[] {
  const importanceMap = {
    low: 1,
    medium: 2,
    high: 3
  };

  if (value === "ascend") {
    return tasks.sort(
      (a, b) => importanceMap[a.importance] - importanceMap[b.importance]
    );
  } else if (value === "descend") {
    return tasks.sort(
      (a, b) => importanceMap[b.importance] - importanceMap[a.importance]
    );
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
        new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime()
    );
  } else if (value === "descend") {
    return tasks.sort(
      (a, b) =>
        new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
    );
  } else return tasks;
}

interface HasName {
  title: string;
}

function filterBySearchedName<T extends HasName>(
  array: T[],
  searchName: string | undefined
) {
  if (!searchName) return array;

  return array.filter((item) =>
    item.title.toLowerCase().includes(searchName.toLowerCase())
  );
}
