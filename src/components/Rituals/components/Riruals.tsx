import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Modal from "../../Modal/Modal";
import { Modal_Input_Importance } from "../../Modal/Modal_Input_Importance";
import Modal_Input_Reminder from "../../Modal/Modal_Input_Reminder";
import { Modal_Input_Text } from "../../Modal/Modal_Input_Text";
import ModalFooter from "../../Modal/ModalFooter";
import TitlePlusBtn from "../../TitlePlusBtn";
import { RitualFormData, ritualSchema } from "../constants";
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
            <Modal_Input_Importance />

            {/* --reminder------------------------------------------  */}
            <Modal_Input_Reminder errorMessages={errors.frequency?.message} />

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
