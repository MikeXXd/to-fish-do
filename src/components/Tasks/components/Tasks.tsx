import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "../../Modal";
import ModalFooter from "../../ModalFooter";
import TitlePlusBtn from "../../TitlePlusBtn";
import { TaskFormData, taskSchema } from "../constants";
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { FilterBar } from "./FilterBar";
import TaskList from "./TaskList";
import { IMPORTANCE } from "../../../constants";

export default function Tasks() {
  const { addTask, filterByImportance } = useTasks();
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TaskFormData>({ resolver: zodResolver(taskSchema) });

  function onSubmit(data: FieldValues) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      importance: data.importance,
      star: false,
      done: false,
      timeStamp: new Date()
    };
    addTask(newTask);
    filterByImportance(undefined);
    reset();
    setIsModalOpen(false);
  }

  function onClose() {
    reset();
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="flex justify-center items-center flex-col flex-wrap min-w-[300px] w-full  max-w-[800px] h-fit bg-slate-300 rounded-md p-1 gap-4">
          <TitlePlusBtn title="Tasks" onClick={() => setIsModalOpen(true)} />
          <FilterBar onChange={setSearch} searchName={search} />
          <TaskList searchName={search} />
        </div>
      </div>
      <Modal
        title="Add new Task"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* --Title------------------------------------------ */}
          <div className="flex flex-col">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              {...register("title")}
              id="title"
              autoFocus
              className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 py-1 rounded-md"
            />
            {errors.title && errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* --Importance------------------------------------------ */}
          <div className="flex flex-col">
            <label htmlFor="importance">Importance</label>
            <div
              id="importance"
              className="flex justify-between w-full grid-cols-4 gap-2 rounded-md bg-white p-2"
            >
              {IMPORTANCE.map((value, index) => (
                <div key={index}>
                  <input
                    {...register("importance")}
                    type="radio"
                    id={`importance-${index}`}
                    value={value}
                    className="peer hidden"
                    defaultChecked={index === 0}
                  />
                  <label
                    htmlFor={`importance-${index}`}
                    className="block cursor-pointer select-none rounded-md p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                  >
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <ModalFooter
            closeBtnName="Close"
            onCancel={onClose}
            submitBtnName="Save Task"
          />
        </form>
      </Modal>
    </>
  );
}
