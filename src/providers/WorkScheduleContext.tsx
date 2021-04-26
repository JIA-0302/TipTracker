import React, { createContext, useState } from "react";

interface WorkScheduleContextProps {
  hasNewSchedule: boolean;
  refreshWorkSchedule: () => void;
  foundWorkSchedule: () => void;
}

export const WorkScheduleContext = createContext<
  Partial<WorkScheduleContextProps>
>({});

export const WorkScheduleProvider = ({ children }) => {
  const [hasNewSchedule, setNewSchedule] = useState(true);

  const refreshWorkSchedule = () => {
    setNewSchedule(true);
  };

  const foundWorkSchedule = () => {
    setNewSchedule(false);
  };

  return (
    <WorkScheduleContext.Provider
      value={{ hasNewSchedule, refreshWorkSchedule, foundWorkSchedule }}
    >
      {children}
    </WorkScheduleContext.Provider>
  );
};
