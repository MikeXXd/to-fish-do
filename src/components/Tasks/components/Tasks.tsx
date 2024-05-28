import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Modal from "../../Modal/Modal";
import ModalFooter from "../../Modal/ModalFooter";
import TitlePlusBtn from "../../TitlePlusBtn";
import { TaskFormData, taskSchema } from "../constants";
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { FilterBar } from "./FilterBar";
import TaskList from "./TaskList";
import { IMPORTANCE } from "../../../constants";
import { Modal_Input_Text } from "../../Modal/Modal_Input_Text";

export default function Tasks() {
  const { addTask, filterByImportance } = useTasks();
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset
  // } = useForm<TaskFormData>({ resolver: zodResolver(taskSchema) });

  const methods = useForm<TaskFormData>({ resolver: zodResolver(taskSchema) });

  const errors = methods.formState.errors;

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
    methods.reset();
    setIsModalOpen(false);
  }

  function onClose() {
    methods.reset();
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
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* --Title------------------------------------------ */}
            <Modal_Input_Text
              name="title"
              errorMessages={errors.title?.message}
              autoFocus
            />

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
                      {...methods.register("importance")}
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
        </FormProvider>
      </Modal>
    </>
  );
}
