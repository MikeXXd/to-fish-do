import { FieldValues, useForm } from "react-hook-form";
import { Task } from "../App";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Title must have at least 3 characters" }),
});

interface InterfaceBarProps {
  onSubmit: (newTask: Task) => void;
}

type FormData = z.infer<typeof schema>;

// interface FormData {
//   name: string;
// }

const InterfaceBar = ({ onSubmit }: InterfaceBarProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function whenSubmit(data: FieldValues) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: data.name,
      done: false,
    };
    onSubmit(newTask);
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
        {errors.name && <p>{errors.name.message}</p>}
      </label>
    </form>
  );
};

export default InterfaceBar;
