import { Pencil, Save, SquareCheck, Trash2, Undo2 } from "lucide-react";
import { useRef, useState } from "react";
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { ImportanceSelector } from "./ImportanceSelector";
import { StarAction } from "./StarAction";

interface Props {
  task: Task;
}

export function TaskListItem({ task }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editRef = useRef<HTMLInputElement>(null);
  const { deleteTask, taskDone, editTitle } = useTasks();

function handleOnBlur() {
  // setTimeout is here to delay the onBlur event so the buttons click event can be triggered first
  setTimeout(() => {
    setIsEditing(false);
  }, 100);
  }

  function handleEdit() {
    const newTitle = editRef.current?.value;
    if (newTitle === undefined || newTitle === task.name) {
      setIsEditing(false);
    } else {
      editTitle(task, newTitle);
      setIsEditing(false);
    }
  }

  return (
    <li key={task.id} className="flex flex-nowrap justify-between p-2">
      {isEditing ? <input
          ref={editRef}
          type="text"
          defaultValue={task.name}
          autoFocus
          className=" px-2 w-full me-2 rounded-md"
          onBlur={handleOnBlur}
        /> : (
        <span
          className={`${task.done && "line-through whitespace-break-spaces"} me-5 w-full`}
        >
          {task.name}
          <div className="flex justify-between">
          <ImportanceSelector task={task} />
          <StarAction task={task}/>
          </div>
        </span>
      )}

      {!isEditing && (
        <div className="flex flex-nowrap">
          <button
            onClick={() => taskDone(task)}
            className={`${task.done ? "text-green-700" : "text-orange-500"} me-1 hover:scale-125`}
            title="Mark as done"
          >
            <SquareCheck size={24} />
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className={` me-1 p-2 hover:scale-125`}
            title="Edit task"

          >
            <Pencil size={24} />
          </button>

          <button
            onClick={() => deleteTask(task)}
            className={`text-gray-800  hover:scale-125`}
            title="Delete task"
          >
            <Trash2 size={24} />
          </button>
        </div>
      )}

      {/* --Title-Editing-mode-for-buttons----------------------------------------- */}
      {isEditing && (
        <div className="flex flex-nowrap">
          <button onClick={handleEdit} className={` me-1 p-2 hover:scale-125`}
          title="Save edited title">
            <Save size={24} />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className={` me-1 hover:scale-125`}
            title="Cancel editing"
          >
            <Undo2 size={24} />
          </button>
        </div>
      )}
    </li>
  );
}
