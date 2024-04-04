import { useState } from "react";
import { AddNewTaskBar } from "./components/AddNewTaskBar";
import { FilterBar } from "./components/FilterBar";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

const App = () => {

  const [search, setSearch] = useState<string>("");
  
  return (
    <main className="flex justify-center h-screen">
      <div className="flex justify-center items-center flex-col flex-wrap min-w-[400px] w-11/12  max-w-[800px] h-fit bg-slate-300 rounded-md p-8 m-8 gap-4">
        <Header />
        <AddNewTaskBar />
        <FilterBar onChange={setSearch} searchName={search}/>
        <TaskList searchName={search}/>
      </div>
    </main>
  );
};

export default App;
