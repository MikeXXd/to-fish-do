import { FormEvent, useRef } from "react";
import { Task } from "../App";

interface InterfaceBarProps {
  onSubmit: (newTask: Task) => void;
}

const InterfaceBar = ({ onSubmit }: InterfaceBarProps) => {
  const newTaskRef = useRef<HTMLInputElement>(null);

  function addtask(e: FormEvent) {
    e.preventDefault();
    if (newTaskRef.current) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        name: newTaskRef.current.value,
        done: false,
      };
      console.log(newTask);
      onSubmit(newTask);
      newTaskRef.current.value = "";
    }
  }

  return (
    <form className="flex justify-start p-2 "  onSubmit={addtask}>
      <label className="block ">
        <span className="block text-sm font-medium text-slate-700">
          New task
        </span>
        <input
          type="text"
          id="task"
          placeholder="add new task"
          ref={newTaskRef}
          className="  p-2 max-w-[800px] min-w-[300px] rounded-md"
        />
      </label>
    </form>
  );
};

export default InterfaceBar;
