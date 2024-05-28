import { useFormContext } from "react-hook-form";
import { Importance, IMPORTANCE } from "../../constants";

interface Props {
  defaultValue?: Importance;
}

export function Modal_Input_Importance({
  defaultValue = IMPORTANCE[0]
}: Props) {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col">
      <label htmlFor="importance">Importance</label>
      <div
        id="importance"
        className="flex justify-between w-full grid-cols-4 gap-2 rounded-md bg-white p-2"
      >
        {IMPORTANCE.map((value) => (
          <div key={value}>
            <input
              {...register("importance")}
              type="radio"
              id={`importance-${value}`}
              value={value}
              className="peer hidden"
              defaultChecked={defaultValue === value}
            />
            <label
              htmlFor={`importance-${value}`}
              className="block cursor-pointer select-none rounded-md p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              {value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
