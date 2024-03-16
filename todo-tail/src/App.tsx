import Header from "./components/Header";
import InterfaceBar from "./components/InterfaceBar";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <main className="bg-black flex justify-center h-screen">
      <div className="flex justify-center items-center flex-col flex-wrap min-w-[400px] h-fit bg-slate-300 rounded-md p-8 m-8 gap-4">
        <Header />
        <InterfaceBar />
        <TaskList />
      </div>
    </main>
  );
};

export default App;

// function saveToLS(value: Task[]) {
//   localStorage.setItem(LOCAL_STORAGE_TASKS.KEY, JSON.stringify(value));
// }
