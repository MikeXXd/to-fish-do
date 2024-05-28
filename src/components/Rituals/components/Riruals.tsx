import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { IMPORTANCE } from "../../../constants";
import Modal from "../../Modal/Modal";
import { Modal_Input_Text } from "../../Modal/Modal_Input_Text";
import ModalFooter from "../../Modal/ModalFooter";
import TitlePlusBtn from "../../TitlePlusBtn";
import { RITUAL_REMINDER, RitualFormData, ritualSchema } from "../constants";
import { Ritual } from "../contexts/Ritual";
import useRituals from "../hooks/useRituals";
import RitualsList from "./RitualsList";

export function Rituals() {
  const { addRitual } = useRituals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methodes = useForm<RitualFormData>({
    resolver: zodResolver(ritualSchema)
  });
  const errors = methodes.formState.errors;

  function onSubmit(data: FieldValues) {
    const newRitual: Ritual = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      importance: data.importance,
      reminder: data.reminder,
      frequency: data.frequency,
      timeStamp: new Date(),
      performed: []
    };
    addRitual(newRitual);
    methodes.reset();
    setIsModalOpen(false);
  }

  function onClose() {
    methodes.reset();
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
        <FormProvider {...methodes}>
          <form
            onSubmit={methodes.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* --Title------------------------------------------ */}
            <Modal_Input_Text
              name="title"
              errorMessages={errors.title?.message}
              autoFocus
            />

            {/* --Description------------------------------------------ */}
            <Modal_Input_Text
              name="description"
              errorMessages={errors.description?.message}
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
                      {...methodes.register("importance")}
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
                      {...methodes.register("reminder")}
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
                    {...methodes.register("frequency")}
                    id="frequency"
                    defaultValue={1}
                    className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 m-2 py-1 rounded-md w-16 text-xl font-bold text-blue-500 focus:scale-150"
                  />
                  <label
                    htmlFor="frequency"
                    className="text-xl font-bold text-blue-500"
                  >
                    {`${methodes.watch("frequency") == 1 ? " time" : " times"} ${methodes.watch("reminder")}`}
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
        </FormProvider>
      </Modal>
    </>
  );
}
