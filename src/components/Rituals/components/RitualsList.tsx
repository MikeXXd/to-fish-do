import useRituals from "../hooks/useRituals";
import RitualsListItem from "./RitualsListItem";

export default function RitualsList() {
  const { rituals } = useRituals();

  return (
    <ul className="flex flex-col gap-2 mt-8 sm:max-w-fit w-full ">
      {rituals.map((ritual) => (
        <RitualsListItem key={ritual.id} ritual={ritual} />
      ))}
    </ul>
  );
}
