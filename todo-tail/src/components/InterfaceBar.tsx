import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";

const schema = z.object({
  name: z.string().min(3, { message: "Title must have at least 3 characters" })
});

type FormData = z.infer<typeof schema>;

export const InterfaceBar = () => {
  const { addTask } = useTasks();
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
      done: false
    };
    addTask(newTask);
    reset();
  }

  return (
    <form
      className="flex justify-start p-2 "
      onSubmit={handleSubmit(whenSubmit)}
    >
      <label className="block ">
        <span className="block text-sm font-medium text-slate-700">
          New task
        </span>
        <input
          {...register("name")}
          type="text"
          id="task"
          placeholder="add new task"
          className="  p-2 max-w-[800px] min-w-[300px] rounded-md"
        />
        <button
          type="submit"
          className="px-2 py-1 m-1 bg-gray-400 text-slate-950 rounded-md"
        >
          Add
        </button>
        {errors.name && <p>{errors.name.message}</p>}
      </label>
    </form>
  );
};

export default InterfaceBar;
