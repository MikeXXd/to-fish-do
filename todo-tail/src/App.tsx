import { useState } from "react";
import Header from "./components/Header";
import InterfaceBar from "./components/InterfaceBar";
import TaskList from "./components/TaskList";

// const LOCAL_STORAGE_TASKS = {
//   KEY: "tasks",
//   DEFAULT: "",
// };

export interface Task {
  id: string;
  name: string;
  done: boolean;
}
const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log(tasks);

  function handleTaskDone(taskDone: Task) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskDone.id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDelete(DeleteTask: Task) {
    setTasks((current) => current.filter((task) => task.id !== DeleteTask.id));
  }

  return (
    <main className="bg-black flex justify-center h-screen">
      <div className="flex justify-center items-center flex-col flex-wrap min-w-[400px] h-fit bg-slate-300 rounded-md p-8 m-8 gap-4">
        <Header />
        <InterfaceBar
          onSubmit={(newTask) => setTasks((current) => [newTask, ...current])}
        />
        <TaskList
          tasks={tasks}
          onTaskDone={(task) => handleTaskDone(task)}
          onDelete={(task) => handleDelete(task)}
        />
      </div>
    </main>
  );
};

export default App;
