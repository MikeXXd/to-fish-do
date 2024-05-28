import { useFormContext } from "react-hook-form";

interface ModalInputTextProps {
  name: string;
  errorMessages: string | undefined;
  defaultValue?: string;
  autoFocus?: boolean;
}

export function Modal_Input_Text({
  name,
  errorMessages,
  defaultValue = "",
  autoFocus = false
}: ModalInputTextProps) {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="capitalize">
        {name}
      </label>
      <input
        type="text"
        {...register(name)}
        id={name}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 py-1 rounded-md text-blue-500 font-bold"
      />
      {errorMessages && <p className="text-red-500">{errorMessages}</p>}
    </div>
  );
}
