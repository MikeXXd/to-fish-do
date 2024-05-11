import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "../../Modal";
import TitlePlusBtn from "../../TitlePlusBtn";
import { IMPORTANCE, RitualFormData, ritualSchema } from "../constants";
import { Ritual } from "../contexts/Ritual";
import useRituals from "../hooks/useRituals";
import RitualsList from "./RitualsList";

export function Rituals() {
  const { addRitual } = useRituals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
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
              {IMPORTANCE.map((value, index) => (
                <div>
                  <input
                    {...register("importance")}
                    type="radio"
                    id={index.toString()}
                    value={value}
                    className="peer hidden"
                    defaultChecked={index === 0}
                  />
                  <label
                    htmlFor={index.toString()}
                    className="block cursor-pointer select-none rounded-md p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                  >
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/*footer*/}
          <div className="flex items-center justify-end mt-6">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-green-600 text-white hover:bg-green-500  hover:text-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
