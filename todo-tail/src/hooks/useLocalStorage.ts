import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) return JSON.parse(storedValue);
    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
