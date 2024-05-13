import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "../../Modal";
import TitlePlusBtn from "../../TitlePlusBtn";
import {
  RITUAL_IMPORTANCE,
  RITUAL_REMINDER,
  RitualFormData,
  ritualSchema
} from "../constants";
import { Ritual } from "../contexts/Ritual";
import useRituals from "../hooks/useRituals";
import RitualsList from "./RitualsList";
import ModalFooter from "../../ModalFooter";

export function Rituals() {
  const { addRitual } = useRituals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RitualFormData>({ resolver: zodResolver(ritualSchema) });

  function onSubmit(data: FieldValues) {
    const newRitual: Ritual = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      importance: data.importance,
      reminder: data.reminder,
      frequency: data.frequency,
      timeStamp: new Date()
    };
    addRitual(newRitual);
    console.log("newRitual: ", newRitual);
    reset();
    setIsModalOpen(false);
  }

  function onClose() {
    reset();
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <div className="flex justify-center items-center flex-col flex-wrap min-w-[300px] w-full max-w-[800px] h-fit text-gray-800 bg-slate-300 rounded-md p-1 gap-4">
          <TitlePlusBtn title="Rituals" onClick={() => setIsModalOpen(true)} />
        </div>
        <RitualsList />
      </div>
      <Modal
        title="Add new Ritual"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* --Title------------------------------------------ */}
          <div className="flex flex-col">
            <label htmlFor="title">Ritual Title</label>
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

          {/* --Description------------------------------------------ */}
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              {...register("description")}
              id="description"
              className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 py-1 rounded-md"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* --Importance------------------------------------------ */}
          <div className="flex flex-col">
            <label htmlFor="importance">Importance</label>
            <div
              id="importance"
              className="flex justify-between w-full grid-cols-4 gap-2 rounded-md bg-white p-2"
            >
              {RITUAL_IMPORTANCE.map((value, index) => (
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

          {/* --reminder------------------------------------------  */}
          <div className="flex flex-col">
            <label htmlFor="reminder">Reminder</label>
            <div
              id="reminder"
              className="flex justify-between w-full grid-cols-4 gap-2 rounded-md bg-white p-2"
            >
              {RITUAL_REMINDER.map((value, index) => (
                <div key={index}>
                  <input
                    {...register("reminder")}
                    type="radio"
                    id={`reminder-${index}`}
                    value={value}
                    className="peer hidden"
                    defaultChecked={index === 0}
                  />
                  <label
                    htmlFor={`reminder-${index}`}
                    className="block cursor-pointer select-none rounded-md p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                  >
                    {value}
                  </label>
                </div>
              ))}
            </div>
            {/* /*--frequency------------------------------------------ */}
            <div className="flex flex-col ">
              <div className="flex justify-start items-center">
                <input
                  type="number"
                  min={1}
                  {...register("frequency")}
                  id="frequency"
                  defaultValue={1}
                  className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 m-2 py-1 rounded-md w-16 text-xl font-bold text-blue-500 focus:scale-150"
                />
                <label
                  htmlFor="frequency"
                  className="text-xl font-bold text-blue-500"
                >
                  {`${watch("frequency") == 1 ? " time" : " times"} ${watch("reminder")}`}
                </label>
              </div>
              {errors.frequency && (
                <p className="text-red-500">{errors.frequency.message}</p>
              )}
            </div>
          </div>
          <ModalFooter
            closeBtnName="Close"
            onCancel={onClose}
            submitBtnName="Save Ritual"
          />
        </form>
      </Modal>
    </>
  );
}
