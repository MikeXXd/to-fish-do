import { useState } from "react";
import { AddNewTaskBar } from "./components/AddNewTaskBar";
import { FilterBar } from "./components/FilterBar";
import TaskList from "./components/TaskList";
import { TasksProvider } from "./contexts/Task";

const App = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex justify-center h-screen">
      <div className="flex justify-center items-center flex-col flex-wrap min-w-[300px] w-full  max-w-[800px] h-fit bg-slate-300 rounded-md p-8 m-8 gap-4">
        <TasksProvider>
          <AddNewTaskBar />
          <FilterBar onChange={setSearch} searchName={search} />
          <TaskList searchName={search} />
        </TasksProvider>
      </div>
    </div>
  );
};

export default App;
