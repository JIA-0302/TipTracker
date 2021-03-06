import React, { createContext, useState } from "react";

export interface IShiftTrendData {
  shiftTime: string;
  hourlyWages: string | number;
  creditCardTips: string | number;
  cashTips: string | number;
  totalTips: string | number;
}

export interface IShiftTrendError {
  message: string;
}

export interface IShiftTrends {
  [shiftDate: string]: IShiftTrendData | IShiftTrendError;
}

export interface ShiftTrendsContextProps {
  shiftTrends: IShiftTrends;
  addShiftTrend: (data: IShiftTrends) => void;
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
}

export const ShiftTrendsContext = createContext<
  Partial<ShiftTrendsContextProps>
>({});

interface ShiftTrendsProviderProps {
  defaultCurrentDate: Date;
  children: React.ReactNode;
}

export const ShiftTrendsProvider = ({
  defaultCurrentDate,
  children,
}: ShiftTrendsProviderProps) => {
  const [shiftTrends, setShiftTrends] = useState<IShiftTrends>({
    // Example of Provider state
    // "2021-04-04": {
    //   shiftTime: "10:00 AM - 5:00 PM",
    //   hourlyWages: 123,
    //   creditCardTips: 54,
    //   cashTips: 45,
    // },
    // "2021-04-05": {
    //   shiftTime: "12:00 PM - 6:00 PM",
    //   hourlyWages: 54,
    //   creditCardTips: 323,
    //   cashTips: 64,
    // }
  });

  const [currentDate, setCurrentDate] = useState<Date>(defaultCurrentDate);

  const addShiftTrend = (data: IShiftTrends) => {
    setShiftTrends({
      ...shiftTrends,
      ...data,
    });
  };

  return (
    <ShiftTrendsContext.Provider
      value={{ shiftTrends, addShiftTrend, currentDate, setCurrentDate }}
    >
      {children}
    </ShiftTrendsContext.Provider>
  );
};
