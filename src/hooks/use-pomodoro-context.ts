import { useContext } from "react";
import { PomodoroContext } from "../context/pomodoro-context.tsx";

export function usePomodoroContext() {
  const context = useContext(PomodoroContext);
  const msg = "usePomodoroContext must be used within a PomodoroProvider";
  if (!context) throw new Error(msg);
  return context;
}