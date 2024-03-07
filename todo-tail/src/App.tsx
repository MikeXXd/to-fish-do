import { useState } from "react";
import Header from "./components/Header";
import InterfaceBar from "./components/InterfaceBar";
import TaskList from "./components/TaskList";

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
    <div className="container max-w-lg bg-slate-300 ">
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
  );
};

export default App;
