import { ReactNode, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const LOCAL_STORAGE_TASKS = {
  KEY: "taskies",
  DEFAULT: []
};

export interface Task {
  id: string;
  name: string;
  done: boolean;
}

interface TasksContext {
  tasks: Task[];
  addTask: (task: Task) => void;
  taskDone: (task: Task) => void;
  editTask: (taskId: string, newTitle: string) => void;
  deleteTask: (task: Task) => void;
}

export const Context = createContext<TasksContext>({} as TasksContext);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    LOCAL_STORAGE_TASKS.KEY,
    LOCAL_STORAGE_TASKS.DEFAULT
  );

  function addTask(task: Task) {
    setTasks([task, ...tasks]);
  }

  function taskDone(taskDone: Task) {
    setTasks(
      tasks.map((task) =>
        task.id === taskDone.id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(DeleteTask: Task) {
    setTasks(tasks.filter((task) => task.id !== DeleteTask.id));
  }

  function editTask(taskId: string, newTitle: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: newTitle } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <Context.Provider
      value={{
        tasks,
        addTask,
        taskDone,
        deleteTask,
        editTask
      }}
    >
      {children}
    </Context.Provider>
  );
}
