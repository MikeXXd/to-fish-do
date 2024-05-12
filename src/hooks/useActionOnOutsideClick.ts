import { useEffect, RefObject } from "react";

export function useActionOnOutsideClick(
  dependency: boolean,
  menuRef: RefObject<HTMLElement>,
  onClose: () => void
) {
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        dependency &&
        e.target &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dependency, menuRef, onClose]);
}
