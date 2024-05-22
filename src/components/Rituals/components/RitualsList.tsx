import useRituals from "../hooks/useRituals";
import RitualsListItem from "./RitualsListItem";

export default function RitualsList() {
  const { rituals } = useRituals();

  console.log("rituals: ", rituals);
  return (
    <ul className="flex flex-col gap-3 mt-8 sm:max-w-fit w-full ">
      {rituals.map((ritual) => (
        <RitualsListItem key={ritual.id} ritual={ritual} />
      ))}
    </ul>
  );
}
