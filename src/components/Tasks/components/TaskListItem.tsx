/* eslint-disable react-hooks/exhaustive-deps */
import { differenceInSeconds, formatDistance } from "date-fns";
import {
  EllipsisVertical,
  Pencil,
  Save,
  ShieldX,
  Square,
  SquareCheckBig,
  Trash2,
  Undo2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cc } from "../../../util/cc";
import ImportanceIconFish from "../../ImportanceIconFish";
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { StarIcon } from "./StarIcon";
import { useActionOnOutsideClick } from "../../../hooks/useActionOnOutsideClick";

const TASK_ICON_SIZE = 27;

interface Props {
  task: Task;
}

export function TaskListItem({ task }: Props) {
  const { deleteTask, taskDone, editTitle } = useTasks();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTaskDeleting, setIsTaskDeleteing] = useState<boolean>(false);
  const [isTaskChanging, setIsTaskChanging] = useState<boolean>(false);
  const [lastStateOfStar, setLastStateOfStar] = useState<boolean>(task.star); // needed for comparison if start state change to trigger useEffect
  const [isNewTask, setIsNewTask] = useState<boolean>(() => {
    if (differenceInSeconds(new Date(), task.timeStamp) < 5) {
      return true;
    }
    return false;
  });
  const editRef = useRef<HTMLInputElement>(null);
  const closeMenuRef = useRef<HTMLDivElement>(null);
  useActionOnOutsideClick( isMenuOpen, closeMenuRef, () => setIsMenuOpen(false));

  const timeLasting = formatDistance(task.timeStamp, new Date(), {
    addSuffix: true
  });

  function handleOnBlur() {
    // setTimeout is here to delay the onBlur event so the buttons click event can be triggered first
    setTimeout(() => {
      setIsEditing(false);
    }, 100);
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

  // automatically closing menu spread icons
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isMenuOpen]);

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

  function handleEdit() {
    const newTitle = editRef.current?.value;
    if (newTitle === undefined || newTitle === task.title) {
      setIsEditing(false);
    } else {
      editTitle(task, newTitle);
      setIsEditing(false);
      setIsMenuOpen(false);
      setIsTaskChanging(true);
    }
  }

  function handleDeleteTask() {
    setIsTaskDeleteing(true);
    setIsMenuOpen(false);
  }

  return (
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
      {!isEditing && !isTaskDeleting && (
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
              onClick={() => setIsEditing(true)}
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
          <div className="sm:hidden flex relative transition-transform" ref={closeMenuRef}>
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
                  setIsEditing(true);
                  setIsMenuOpen(false);
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
          <button onClick={() => deleteTask(task)} className="hover:scale-125 transition-transform">
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

      {/* ----Title-Editing-mode----------------------------------------- */}
      {isEditing && (
        <>
          <input
            ref={editRef}
            type="text"
            defaultValue={task.title}
            autoFocus
            className="bg-slate-100 px-2 w-full me-2 rounded-md"
            onBlur={handleOnBlur}
          />

          <div className="flex flex-nowrap">
            <button
              onClick={handleEdit}
              className={` me-1 p-2 hover:scale-125 transition-transform`}
              title="Save edited title"
            >
              <Save size={TASK_ICON_SIZE} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="me-1 hover:scale-125 transition-transform"
              title="Cancel editing"
            >
              <Undo2 size={TASK_ICON_SIZE} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
