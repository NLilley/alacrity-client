import { KeyboardEvent } from "react";

export const focusHandler = (e: KeyboardEvent) => {
  if (e.key != 'Enter')
    return true;

  e.target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  return false;
}