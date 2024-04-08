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
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { cc } from "../util/cc";
import { ImportanceSelector } from "./ImportanceSelector";
import { StarIcon } from "./StarIcon";

interface Props {
  task: Task;
}

export function TaskListItem({ task }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskIsDeleting, setTaskIsDeleting] = useState<boolean>(false);
  const [isNewTask, setIsNewTask] = useState<boolean>(() => {
    if (differenceInSeconds(new Date(), task.timeStamp) < 5) {
      return true;
    }
    return false;
  });

  const editRef = useRef<HTMLInputElement>(null);
  const { deleteTask, taskDone, editTitle } = useTasks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleOnBlur() {
    // setTimeout is here to delay the onBlur event so the buttons click event can be triggered first
    setTimeout(() => {
      setIsEditing(false);
    }, 100);
  }

  // deleting task after 5 seconds
  useEffect(() => {
    if (taskIsDeleting) {
      const timeoutId = setTimeout(() => {
        if (taskIsDeleting) {
          deleteTask(task);
        }
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [taskIsDeleting]);

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
    if (newTitle === undefined || newTitle === task.name) {
      setIsEditing(false);
    } else {
      editTitle(task, newTitle);
      setIsEditing(false);
      setIsMenuOpen(false);
    }
  }

  // FIXME: remove the ternary operator once all tasks have date of creation
  const timeLasting = task.timeStamp
    ? formatDistance(task.timeStamp, new Date(), { addSuffix: true })
    : "Time not available";

  function handleDeleteTask() {
    setTaskIsDeleting(true);
    setIsMenuOpen(false);
  }

  return (
    <li
      key={task.id}
      className={cc(
        " flex justify-between p-2",
        taskIsDeleting ? "hover:bg-red-300" : "hover:bg-slate-200",
        taskIsDeleting && "bg-red-200 animate-pulse",
        isNewTask && "bg-green-200 animate-pulse"
      )}
    >
      {/* --Normal-mode------------------------------------------------ */}
      {!isEditing && !taskIsDeleting && (
        <>
          <span
            className={cc(
              task.done && "line-through whitespace-break-spaces",
              task.star && "font-medium",
              "me-5 w-full text-ellipsis overflow-hidden"
            )}
          >
            {task.name}
            <div className="flex gap-1 justify-between">
              <ImportanceSelector task={task} />
              <div className="flex gap-1">
                <span className="text-gray-500 text-sm" title="Task lasting">
                  {timeLasting}
                </span>
                <StarIcon task={task} />
              </div>
            </div>
          </span>
          <div className="hidden sm:flex flex-nowrap">
            {task.done ? (
              <button
                onClick={() => taskDone(task)}
                className="text-green-700 me-1 hover:scale-125"
                title="Mark as done"
              >
                <SquareCheckBig size={24} />
              </button>
            ) : (
              <button
                onClick={() => taskDone(task)}
                className="text-orange-700 me-1 hover:scale-125"
                title="Mark as done"
              >
                <Square size={24} />
              </button>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className={` me-1 p-2 hover:scale-125`}
              title="Edit task"
            >
              <Pencil size={24} />
            </button>
            <button
              onClick={handleDeleteTask}
              className={`text-gray-800  hover:scale-125`}
              title="Delete task"
            >
              <Trash2 size={24} />
            </button>
          </div>
          {/* ----Menu-spread-icons----------------------------------------- */}
          <div className="sm:hidden flex relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:text-white text-gray-200"
            >
              {!isMenuOpen && <EllipsisVertical size={24} color="black" />}
            </button>
            <div
              className={cc(isMenuOpen ? "flex" : "hidden", "flex-col gap-2")}
              role="menu"
              onFocus={() => console.log("OnFocus")}
              onBlur={() => console.log("OnBlur")}
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {task.done ? (
                <button
                  onClick={() => {
                    taskDone(task);
                    setIsMenuOpen(false);
                  }}
                  className="text-green-700 hover:scale-125"
                  title="Mark as done"
                >
                  <SquareCheckBig size={24} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    taskDone(task);
                    setIsMenuOpen(false);
                  }}
                  className="text-orange-700 hover:scale-125"
                  title="Mark as done"
                >
                  <Square size={24} />
                </button>
              )}
              <button
                onClick={() => {
                  setIsEditing(true);
                  setIsMenuOpen(false);
                }}
                className={` hover:scale-125`}
                title="Edit task"
              >
                <Pencil size={24} />
              </button>
              <button
                onClick={handleDeleteTask}
                className={`text-gray-800  hover:scale-125`}
                title="Delete task"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ----Task-Deleting-mode------------------------------------------ */}
      {taskIsDeleting && (
        <>
          <span className="font-bold text-ellipsis overflow-hidden">
            !!! Deleting task !!! - {task.name}
          </span>
          <div className=" flex justify-between">
            <button
              onClick={() => setTaskIsDeleting(false)}
              className="`text-red-700 hover:scale-125"
              title="Cancel deleting"
            >
              <ShieldX size={24} />{" "}
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
            defaultValue={task.name}
            autoFocus
            className="bg-slate-100 px-2 w-full me-2 rounded-md"
            onBlur={handleOnBlur}
          />

          <div className="flex flex-nowrap">
            <button
              onClick={handleEdit}
              className={` me-1 p-2 hover:scale-125`}
              title="Save edited title"
            >
              <Save size={24} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="me-1 hover:scale-125"
              title="Cancel editing"
            >
              <Undo2 size={24} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
