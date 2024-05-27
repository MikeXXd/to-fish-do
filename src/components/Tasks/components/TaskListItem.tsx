/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds, formatDistance } from "date-fns";
import {
  EllipsisVertical,
  Pencil,
  ShieldX,
  Square,
  SquareCheckBig,
  Trash2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IMPORTANCE } from "../../../constants";
import { useActionOnOutsideClick } from "../../../hooks/useActionOnOutsideClick";
import { cc } from "../../../util/cc";
import ImportanceIconFish from "../../ImportanceIconFish";
import Modal from "../../Modal";
import ModalFooter from "../../ModalFooter";
import { TaskFormData, taskSchema } from "../constants";
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { StarIcon } from "./StarIcon";

const TASK_ICON_SIZE = 27;

interface Props {
  task: Task;
}

export function TaskListItem({ task }: Props) {
  const { deleteTask, taskDone, editTask, filterByImportance } = useTasks();
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskDeleting, setIsTaskDeleteing] = useState<boolean>(false);
  const [isTaskChanging, setIsTaskChanging] = useState<boolean>(false);
  const [lastStateOfStar, setLastStateOfStar] = useState<boolean>(task.star); // needed for comparison if start state change to trigger useEffect
  const [isNewTask, setIsNewTask] = useState<boolean>(() => {
    if (differenceInSeconds(new Date(), task.timeStamp) < 5) {
      return true;
    }
    return false;
  });
  // const editRef = useRef<HTMLInputElement>(null);
  const closeMenuRef = useRef<HTMLDivElement>(null);
  useActionOnOutsideClick(isMenuOpen, closeMenuRef, () => setIsMenuOpen(false));
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TaskFormData>({ resolver: zodResolver(taskSchema) });

  const timeLasting = formatDistance(task.timeStamp, new Date(), {
    addSuffix: true
  });

  function onSubmit(data: FieldValues) {
    const newTask: Task = {
      id: task.id, //not changing
      title: data.title,
      importance: data.importance,
      star: data.star, //not changing
      done: data.done, //not changing
      timeStamp: task.timeStamp //not changing
    };
    editTask(newTask);
    filterByImportance(undefined);
    reset();
    setIsModalOpen(false);
  }

  function onClose() {
    reset();
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (lastStateOfStar !== task.star) {
      setLastStateOfStar(task.star);
      setIsTaskChanging(true);
    }
  }, [task.star]);

  //task state (done, star) changing
  useEffect(() => {
    if (isTaskChanging) {
      const timeoutId = setTimeout(() => {
        if (isTaskChanging) {
          setIsTaskChanging(false);
        }
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isTaskChanging]);

  // closing new task pulse animation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isNewTask) {
        setIsNewTask(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  });


  function handleDeleteTask() {
    setIsTaskDeleteing(true);
    setIsMenuOpen(false);
  }

  return (
    <>
      <li
        key={task.id}
        className={cc(
          " flex justify-between items-center gap-4 p-2",
          isTaskDeleting ? "hover:bg-red-300" : "hover:bg-slate-200",
          isTaskDeleting && "bg-red-200 animate-pulse",
          isNewTask && "bg-green-200 animate-pulse",
          isNewTask ? "hover:bg-green-200" : "hover:bg-slate-200",
          isTaskChanging && "bg-yellow-300 animate-pulse",
          isTaskChanging ? "hover:bg-yellow-300" : "hover:bg-slate-200"
        )}
      >
        {/* --Normal-mode------------------------------------------------ */}
        {isTaskDeleting || (
          <>
            {/*--left-side------------------------------------------------ */}
            <span
              className={cc(
                task.done && "line-through whitespace-break-spaces",
                task.star && "font-medium",
                "me-5 w-full text-ellipsis overflow-hidden"
              )}
            >
              {task.title}
              <div className="flex">
                <div className="flex gap-2">
                  <span className="text-gray-500 text-sm" title="Task lasting">
                    {timeLasting}
                  </span>
                  <StarIcon task={task} />
                </div>
              </div>
            </span>
            {/*--right-side------------------------------------------------ */}
            <div className="hidden sm:flex flex-nowrap items-center gap-3">
              <ImportanceIconFish importance={task.importance} />
              {task.done ? (
                <button
                  onClick={() => {
                    taskDone(task);
                    setIsTaskChanging(true);
                  }}
                  className="text-green-700 hover:scale-125 transition-transform"
                  title="Mark as done"
                >
                  <SquareCheckBig size={TASK_ICON_SIZE} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    taskDone(task);
                    setIsTaskChanging(true);
                  }}
                  className="text-orange-700 hover:scale-125 transition-transform"
                  title="Mark as done"
                >
                  <Square size={TASK_ICON_SIZE} />
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className={`hover:scale-125 transition-transform`}
                title="Edit task"
              >
                <Pencil size={TASK_ICON_SIZE} />
              </button>
              <button
                onClick={handleDeleteTask}
                className={`text-gray-800  hover:scale-125 transition-transform`}
                title="Delete task"
              >
                <Trash2 size={TASK_ICON_SIZE} />
              </button>
            </div>

            {/* ----Menu-spread-icons-open---------------------------------------- */}
            <div
              className="sm:hidden flex relative transition-transform"
              ref={closeMenuRef}
            >
              {isMenuOpen || (
                <div className="sm:hidden flex relative">
                  <ImportanceIconFish
                    importance={task.importance}
                    size={TASK_ICON_SIZE}
                  />
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-500 hover:text-black hover:scale-125 transition-transform"
                  >
                    <EllipsisVertical size={TASK_ICON_SIZE} color="black" />
                  </button>
                </div>
              )}
              <div
                className={cc(isMenuOpen ? "flex" : "hidden", "gap-2")}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {task.done ? (
                  <button
                    onClick={() => {
                      taskDone(task);
                      setIsTaskChanging(true);
                      setIsMenuOpen(false);
                    }}
                    className="text-green-700 hover:scale-125 transition-transform"
                    title="Mark as done"
                  >
                    <SquareCheckBig size={TASK_ICON_SIZE} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      taskDone(task);
                      setIsTaskChanging(true);
                      setIsMenuOpen(false);
                    }}
                    className="text-orange-700 hover:scale-125 transition-transform"
                    title="Mark as done"
                  >
                    <Square size={TASK_ICON_SIZE} />
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  className={` hover:scale-125 transition-transform`}
                  title="Edit task"
                >
                  <Pencil size={TASK_ICON_SIZE} />
                </button>
                <button
                  onClick={handleDeleteTask}
                  className={`text-gray-800  hover:scale-125 transition-transform`}
                  title="Delete task"
                >
                  <Trash2 size={TASK_ICON_SIZE} />
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-500 hover:text-black hover:scale-125 transition-transform"
                >
                  <EllipsisVertical size={TASK_ICON_SIZE} color="black" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* ----Task-Deleting-mode------------------------------------------ */}
        {isTaskDeleting && (
          <>
            <button
              onClick={() => deleteTask(task)}
              className="hover:scale-125 transition-transform"
            >
              <Trash2 size={TASK_ICON_SIZE} />
            </button>
            <span className="font-bold text-ellipsis overflow-hidden flex align-middle">
              {task.title}
            </span>
            <div className=" flex justify-between">
              <button
                onClick={() => setIsTaskDeleteing(false)}
                className="`text-red-700 hover:scale-125 transition-transform"
                title="Cancel deleting"
              >
                <ShieldX size={TASK_ICON_SIZE} />{" "}
              </button>
            </div>
          </>
        )}
      </li>

      <Modal
        title="Edit Task"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* --Title------------------------------------------ */}
          <div className="flex flex-col">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              {...register("title")}
              id="title"
              defaultValue={task.title}
              className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 py-1 rounded-md text-blue-500 font-bold"
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
                    defaultChecked={task.importance === value}
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
