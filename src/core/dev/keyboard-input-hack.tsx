"use client";

import { useEffect } from "react";

interface IKeyInputHack {
  callback: (e: KeyboardEvent) => void;
}

export const KeyInputHack: React.FC<IKeyInputHack> = ({ callback }) => {
  useEffect(() => {
    console.log("KeyInputHack");
    window.addEventListener("keydown", callback);
    return () => window.removeEventListener("keydown", callback);
  }, []);

  return null;
};
