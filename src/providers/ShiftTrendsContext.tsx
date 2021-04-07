import React, { createContext, useState } from "react";

export interface IShiftTrendData {
  shiftTime: string;
  hourlyWages: string | number;
  creditCardTips: string | number;
  cashTips: string | number;
}

export interface IShiftTrends {
  [shiftDate: string]: IShiftTrendData;
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
    "2021-04-04": {
      shiftTime: "10:00 AM - 5:00 PM",
      hourlyWages: 123,
      creditCardTips: 54,
      cashTips: 45,
    },
    "2021-04-05": {
      shiftTime: "12:00 PM - 6:00 PM",
      hourlyWages: 54,
      creditCardTips: 323,
      cashTips: 64,
    },
    "2021-04-08": {
      shiftTime: "2:00 PM - 8:00 PM",
      hourlyWages: 87,
      creditCardTips: 32,
      cashTips: 75,
    },
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
