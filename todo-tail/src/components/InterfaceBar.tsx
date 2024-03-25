import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePlus } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { ImportanceSelector } from "./ImportanceSelector";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(3, { message: "Title must have at least 3 characters" })
});

type FormData = z.infer<typeof schema>;

export const InterfaceBar = () => {
  const { addTask } = useTasks();
  const [importance, setImportance] = useState<number>(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function whenSubmit(data: FieldValues) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: data.name,
      importance: importance,
      done: false
    };
    addTask(newTask);
    reset();
  }

  return (
    <form
      className="flex justify-end items-start p-2 "
      onSubmit={handleSubmit(whenSubmit)}
    >
      <label className="block ">
        <div className="flex gap-2">
          <span className="block text-sm font-medium text-slate-700">
            New task
          </span>
          <ImportanceSelector onNewTask={(value) => setImportance(value)} />
        </div>
        <input
          {...register("name")}
          type="text"
          id="task"
          placeholder="add new task"
          className=" p-2 max-w-[800px] min-w-[300px] rounded-md"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </label>
      <button
        type="submit"
        className={`text-gray-800 mt-3 p-2 hover:scale-125`}
      >
        <SquarePlus size={40} strokeWidth={1} />
      </button>
    </form>
  );
};

export default InterfaceBar;
