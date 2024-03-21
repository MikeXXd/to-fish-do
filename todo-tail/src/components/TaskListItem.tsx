import { useRef, useState } from "react";
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";

interface Props {
  task: Task;
}

export function TaskListItem({ task }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editRef = useRef<HTMLInputElement>(null);
  const { deleteTask, taskDone, editTask } = useTasks();

  function handleEdit() {
    if (
      editRef.current?.value === undefined ||
      editRef.current?.value === task.name
    )
      setIsEditing(false);
    else {
      editTask(task.id, editRef.current?.value);
      setIsEditing(false);
      console.log(editRef.current?.value);
    }
  }

  return (
    <li key={task.id} className="flex flex-nowrap justify-between p-2">
      {!isEditing && (
        <span
          onClick={() => setIsEditing(true)}
          className={`${task.done && "line-through whitespace-break-spaces"}  `}
        >
          {task.name}
        </span>
      )}

      {isEditing && (
        <input
          ref={editRef}
          type="text"
          defaultValue={task.name}
          autoFocus
          onBlur={() => setIsEditing(false)}
        />
      )}

      {!isEditing && (
        <div className="flex flex-nowrap">
          <button
            onClick={() => taskDone(task)}
            className="px-2 py-1 m-1 h-8 bg-green-700 text-white rounded-md"
          >
            Done
          </button>

          <button
            onClick={() => deleteTask(task)}
            className="px-2 py-1 m-1 h-8 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {isEditing && (
        <div className="flex flex-nowrap">
          <button
            onClick={handleEdit}
            className="px-2 py-1 m-1 h-8 bg-green-700  text-white rounded-md"
          >
            Save
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="px-2 py-1 m-1 h-8 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      )}
    </li>
  );
}
