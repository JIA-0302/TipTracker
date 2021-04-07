import React, { createContext, useState } from "react";

export interface IShiftTrendData {
  shiftTime: string;
  hourlyWages: string | number;
  creditCardTips: string | number;
  cashTips: string | number;
}

export interface IShiftTrendError {
  message: string;
}

export interface IShiftTrends {
  [shiftDate: string]: IShiftTrendData | IShiftTrendError;
}

export const trendsTemplate: IShiftTrendData = {
  shiftTime: "Shift Time",
  hourlyWages: "Hourly Wages",
  creditCardTips: "CC Tips",
  cashTips: "Cash Tips",
};

interface ShiftTrendsContextProps {
  shiftTrends: IShiftTrends;
  addShiftTrend: (data: IShiftTrends) => void;
}

export const ShiftTrendsContext = createContext<
  Partial<ShiftTrendsContextProps>
>({});

export const ShiftTrendsProvider = ({ children }) => {
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

  const addShiftTrend = (data: IShiftTrends) => {
    setShiftTrends({
      ...shiftTrends,
      ...data,
    });
  };

  return (
    <ShiftTrendsContext.Provider value={{ shiftTrends, addShiftTrend }}>
      {children}
    </ShiftTrendsContext.Provider>
  );
};
