import { formatDistance } from "date-fns";
import {
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
import { ImportanceSelector } from "./ImportanceSelector";
import { StarIcon } from "./StarIcon";
import { cc } from "../util/cc";

interface Props {
  task: Task;
}

export function TaskListItem({ task }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskIsDeleting, setTaskIsDeleting] = useState<boolean>(false);

  const editRef = useRef<HTMLInputElement>(null);
  const { deleteTask, taskDone, editTitle } = useTasks();

  function handleOnBlur() {
    // setTimeout is here to delay the onBlur event so the buttons click event can be triggered first
    setTimeout(() => {
      setIsEditing(false);
    }, 100);
  }

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
  }, [taskIsDeleting, deleteTask, task]);

  function handleEdit() {
    const newTitle = editRef.current?.value;
    if (newTitle === undefined || newTitle === task.name) {
      setIsEditing(false);
    } else {
      editTitle(task, newTitle);
      setIsEditing(false);
    }
  }

  // FIXME: remove the ternary operator once all tasks have date of creation
  const timeLasting = task.timeStamp
    ? formatDistance(task.timeStamp, new Date(), { addSuffix: true })
    : "Time not available";

  function handleDeleteTask() {
    setTaskIsDeleting(true);
  }

  return (
    <li
      key={task.id}
      className={cc(
        " flex justify-between p-2",
        taskIsDeleting ? "hover:bg-red-300" : "hover:bg-slate-200",
        taskIsDeleting && "bg-red-200 animate-pulse"
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
          <div className="flex flex-nowrap">
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
        </>
      )}

      {/* --Task-Deleting-mode------------------------------------------ */}
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

      {/* --Title-Editing-mode----------------------------------------- */}
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
