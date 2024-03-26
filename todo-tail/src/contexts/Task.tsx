import { ReactNode, createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const LOCAL_STORAGE_TASKS = {
  KEY: "taskies",
  DEFAULT: []
};

export interface Task {
  id: string;
  name: string;
  importance: number;
  done: boolean;
  star: boolean;
}

interface TasksContext {
  tasks: Task[];
  addTask: (task: Task) => void;
  taskDone: (task: Task) => void;
  editTitle: (task: Task, newTitle: string) => void;
  setImportance: (id: string, importance: number) => void;
  deleteTask: (task: Task) => void;
  filterFinishedTasks: () => void;
  areFinishedTasksHidden: boolean;
  arrangeStarForTask: (task: Task) => void;
}

export const Context = createContext<TasksContext>({} as TasksContext);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    LOCAL_STORAGE_TASKS.KEY,
    LOCAL_STORAGE_TASKS.DEFAULT
  );
  const [areFinishedTasksHidden, setAreFinishedTasksHidden] =
    useState<boolean>(false);

  function addTask(task: Task) {
    setTasks([task, ...tasks]);
  }

  function taskDone(taskDone: Task) {
    setTasks(
      tasks.map((task) =>
        task.id === taskDone.id
          ? { ...task, done: !task.done, star: false }
          : task
      )
    );
  }

  function deleteTask(DeleteTask: Task) {
    setTasks(tasks.filter((task) => task.id !== DeleteTask.id));
  }

  function editTitle(updatingTask: Task, newTitle: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === updatingTask.id ? { ...task, name: newTitle } : task
    );
    setTasks(updatedTasks);
  }

  function setImportance(id: string, importance: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, importance: importance } : task
    );
    setTasks(updatedTasks);
  }

  function filterFinishedTasks() {
    setAreFinishedTasksHidden((value) => !value);
  }

  function arrangeStarForTask(taskStar: Task) {
    setTasks(
      tasks.map((task) =>
        task.id === taskStar.id ? { ...task, star: !task.star } : task
      )
    );
  }

  return (
    <Context.Provider
      value={{
        tasks,
        addTask,
        taskDone,
        deleteTask,
        editTitle,
        setImportance,
        filterFinishedTasks,
        areFinishedTasksHidden,
        arrangeStarForTask
      }}
    >
      {children}
    </Context.Provider>
  );
}
