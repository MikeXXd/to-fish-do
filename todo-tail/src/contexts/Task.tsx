import { ReactNode, createContext, useState } from "react";

const LOCAL_STORAGE_TASKS = {
  KEY: "tasks",
  DEFAULT: "",
};

interface TasksContext {
  tasks: Task[];
  addTask: (task: Task) => void;
  taskDone: (task: Task) => void;
  deleteTask: (task: Task) => void;
}

export interface Task {
  id: string;
  name: string;
  done: boolean;
}

export const Context = createContext<TasksContext>({} as TasksContext);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storage = localStorage.getItem(LOCAL_STORAGE_TASKS.KEY);
    if (storage == null) return [];
    return JSON.parse(storage);
  });
  function updateTasks(newValue: Task[]) {
    setTasks(newValue);
    saveToLS(newValue);
  }

  function addTask(task: Task) {
    updateTasks([task, ...tasks]);
  }

  function taskDone(taskDone: Task) {
    updateTasks(
      tasks.map((task) =>
        task.id === taskDone.id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(DeleteTask: Task) {
    updateTasks(tasks.filter((task) => task.id !== DeleteTask.id));
  }

  return (
    <Context.Provider
      value={{
        tasks,
        addTask,
        taskDone,
        deleteTask,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function saveToLS(value: Task[]) {
  localStorage.setItem(LOCAL_STORAGE_TASKS.KEY, JSON.stringify(value));
}
