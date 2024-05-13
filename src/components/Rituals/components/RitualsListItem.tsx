import { zodResolver } from "@hookform/resolvers/zod";
import {
  BarChart4,
  EllipsisVertical,
  FishSymbol,
  Pencil,
  ShieldX,
  Trash2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useActionOnOutsideClick } from "../../../hooks/useActionOnOutsideClick";
import { cc } from "../../../util/cc";
import Modal from "../../Modal";
import {
  RITUAL_IMPORTANCE,
  RITUAL_REMINDER,
  RitualFormData,
  ritualSchema
} from "../constants";
import { Ritual } from "../contexts/Ritual";
import useRituals from "../hooks/useRituals";
import ModalFooter from "../../ModalFooter";

const ICON_SIZE = 27;

export default function RitualsListItem({ ritual }: { ritual: Ritual }) {
  const { deleteRitual, editRitual } = useRituals();
  const [isRitualMenuOpen, setIsRitualMenuOpen] = useState(false);
  const [isRitualDeleting, setIsRitualDeleting] = useState(false); // showing JSX deleting state
  const [isDescriptionFull, setIsDescriptionFull] = useState(false); //for showing full description
  const [shouldOpenMenu, setShouldOpenMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeMenuRef = useRef<HTMLDivElement>(null);
  useActionOnOutsideClick(isRitualMenuOpen, closeMenuRef, () =>
    setIsRitualMenuOpen(false)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RitualFormData>({ resolver: zodResolver(ritualSchema) });

  function onSubmit(data: FieldValues) {
    const editedRitual: Ritual = {
      id: ritual.id, // not changing id
      title: data.title,
      description: data.description,
      importance: data.importance,
      reminder: data.reminder,
      frequency: data.frequency,
      timeStamp: ritual.timeStamp // not changing timeStamp
    };
    editRitual(editedRitual);
    reset();
    setIsModalOpen(false);
  }

  function onModalClose() {
    reset();
    setIsModalOpen(false);
  }

  // --opening menu and also dealing with full description if needed----------------
  useEffect(() => {
    if (!isDescriptionFull && shouldOpenMenu) {
      setIsRitualMenuOpen(true);
      setShouldOpenMenu(false); // Reset for next time
    }
  }, [isDescriptionFull, shouldOpenMenu]);

  function onMenuOpen() {
    setIsDescriptionFull(false);
    setShouldOpenMenu(true);
  }

  // --JSX--deleting-state---------------------------------------------------------
  if (isRitualDeleting) {
    return (
      <li className="mx-2 bg-red-200 rounded-md hover:bg-red-300 transition-all border-red-500 border-2">
        <div className="flex justify-between gap-5 p-2  mx-auto font-semibold text-lg ">
          <button
            onClick={() => deleteRitual(ritual)}
            className="hover:scale-125"
            title="Delete Ritual"
          >
            <Trash2 size={ICON_SIZE} />
          </button>
          <span className="font-bold text-ellipsis overflow-hidden flex align-middle">
            {ritual.title}
          </span>
          <div className=" flex justify-between">
            <button
              onClick={() => setIsRitualDeleting(false)}
              className="`text-red-700 hover:scale-125"
              title="Cancel Deleting"
            >
              <ShieldX size={ICON_SIZE} />{" "}
            </button>
          </div>
        </div>
      </li>
    );
  }

  // --JSX--non-deleting-state-------------------------------------------------------
  else
    return (
      <>
        <li
          className={cc(
            "relative grid grid-cols-10 gap-2 mx-2 bg-slate-200 rounded-md hover:bg-slate-100 transition-all max-w-3xl",
            isRitualMenuOpen
              ? "border-2 border-orange-400"
              : "border-transparent border-2"
          )}
        >
          <span className="absolute -top-2 -start-2 bg-red-300 rounded-md p-1 text-xs font-semibold">
            100%
            <span className="sr-only">unread messages</span>
          </span>
          {/* --left-side---title-------------------------------- */}
          <button
            className=" p-2 col-span-8 sm:col-span-4 md:col-span-3 mx-auto font-semibold text-2xl sm:text-lg"
            type="button"
            onClick={() =>
              !isRitualMenuOpen && setIsDescriptionFull(!isDescriptionFull)
            }
          >
            {ritual.title}
          </button>{" "}
          {/* ----right-side---description and icons------------------------------ */}
          <div
            className={`col-span-2 sm:col-span-6 md:col-span-7 flex justify-end items-center sm:justify-between gap-3 `}
          >
            <button
              onClick={() =>
                !isRitualMenuOpen && setIsDescriptionFull(!isDescriptionFull)
              }
              type="button"
              className={cc(
                "hidden sm:block overflow-hidden px-1 text-ellipsis",
                !isDescriptionFull && "truncate"
              )}
            >
              {ritual.description}
            </button>
            {!isRitualMenuOpen ? (
              //----- menu close -------------------------------------------------------
              <div className="flex items-center gap-1">
                {" "}
                <FishSymbol
                  size={ICON_SIZE}
                  className={cc(
                    "flex",
                    ritual.importance === "high" && "-rotate-90 text-red-500",
                    ritual.importance === "medium" &&
                      "-rotate-45 text-orange-400",
                    ritual.importance === "low" && "text-blue-900"
                  )}
                />
                <button
                  onClick={onMenuOpen}
                  className="hover:scale-125 transition-transform"
                >
                  <EllipsisVertical
                    size={ICON_SIZE}
                    className="text-gray-500 hover:text-black "
                  />
                </button>
              </div>
            ) : (
              //------ menu open --------------------------------------------
              <div
                className="flex gap-3 z-10 bg-slate-300 rounded-md p-1 ps-3 me-1 border-2 border-orange-400"
                ref={closeMenuRef}
              >
                <button
                  onClick={() => {
                    setIsRitualMenuOpen(false);
                    setIsRitualDeleting(true);
                  }}
                  className=" hover:scale-125 transition-transform"
                >
                  <Trash2
                    size={ICON_SIZE}
                    className="text-red-700 hover:text-red-500 "
                  />
                </button>

                <button
                  onClick={() => setIsRitualMenuOpen(false)}
                  className="hover:scale-125 transition-transform"
                >
                  <BarChart4
                    size={ICON_SIZE}
                    className="text-gray-800 hover:text-black"
                  />
                </button>
                <button
                  onClick={() => {
                    setIsRitualMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="hover:scale-125 transition-transform"
                >
                  <Pencil
                    size={ICON_SIZE}
                    className="text-gray-800 hover:text-black"
                  />
                </button>
                <button
                  onClick={() => setIsRitualMenuOpen(false)}
                  className="hover:scale-125 transition-transform"
                >
                  <EllipsisVertical
                    size={ICON_SIZE}
                    className={"text-gray-500 hover:text-black"}
                  />
                </button>
              </div>
            )}
          </div>
        </li>
        <Modal
          title="Edit Ritual"
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* --Title------------------------------------------ */}
            <div className="flex flex-col">
              <label htmlFor="title">Ritual Title</label>
              <input
                type="text"
                {...register("title")}
                id="title"
                defaultValue={ritual.title}
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
                defaultValue={ritual.description}
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
                  <div>
                    <input
                      {...register("importance")}
                      type="radio"
                      id={`importance-${index}`}
                      value={value}
                      className="peer hidden"
                      defaultChecked={ritual.importance === value}
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
            {/* --Reminder------------------------------------------ */}
            <div className="flex flex-col">
              <label htmlFor="reminder">Reminder</label>
              <div
                id="reminder"
                className="flex justify-between w-full grid-cols-4 gap-2 rounded-md bg-white p-2"
              >
                {RITUAL_REMINDER.map((value, index) => (
                  <div>
                    <input
                      {...register("reminder")}
                      type="radio"
                      id={`reminder-${index}`}
                      value={value}
                      className="peer hidden"
                      defaultChecked={ritual.reminder === value}
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
              {/* -- frequency------------------------------------------  */}
              <div className="flex flex-col ">
                <div className="flex justify-start items-center">
                  <input
                    type="number"
                    {...register("frequency")}
                    id="frequency"
                    defaultValue={ritual.frequency}
                    className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 m-2 py-1 rounded-md w-16"
                  />
                  <label htmlFor="frequency"> times</label>
                </div>
                {errors.frequency && (
                  <p className="text-red-500">{errors.frequency.message}</p>
                )}
              </div>
            </div>

            {/*--footer--buttons------------------------------------------*/}
            <ModalFooter
              closeBtnName="Close"
              onCancel={onModalClose}
              submitBtnName="Save Changes"
            />
          </form>
        </Modal>
      </>
    );
}
