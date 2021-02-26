import React, { createContext, useState } from "react";

export interface IWorkedShiftDay {
  [shiftDate: string]: { id: number; wageType: "HOURLY" | "NON_HOURLY" };
}

interface WorkedShiftContextProps {
  workedShifts: IWorkedShiftDay;
  addShiftData: (data: IWorkedShiftDay) => void;
  removeShiftData: (shiftDate: string) => void;
}

export const WorkedShiftContext = createContext<
  Partial<WorkedShiftContextProps>
>({});

export const WorkedShiftProvider = ({ children }) => {
  const [workedShifts, setWorkedShifts] = useState<IWorkedShiftDay>({
    // "2021-02-21": {
    //   id: 1,
    //   wageType: "HOURLY",
    // },
    // "2021-02-20": {
    //   id: 2,
    //   wageType: "HOURLY",
    // },
    // "2021-02-19": {
    //   id: 3,
    //   wageType: "HOURLY",
    // },
    // "2021-02-22": {
    //   id: 4,
    //   wageType: "HOURLY",
    // },
  });

  const addShiftData = (data: IWorkedShiftDay) => {
    setWorkedShifts({
      ...workedShifts,
      ...data,
    });
  };

  const removeShiftData = (shiftDate: string) => {
    const newWorkedShifts = { ...workedShifts };
    delete newWorkedShifts[shiftDate];
    setWorkedShifts(newWorkedShifts);
  };

  return (
    <WorkedShiftContext.Provider
      value={{ workedShifts, addShiftData, removeShiftData }}
    >
      {children}
    </WorkedShiftContext.Provider>
  );
};
