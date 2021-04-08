import { IShiftTrendData } from "src/providers/ShiftTrendsContext";

interface TrendsProps {
  data: IShiftTrendData;
}

const Trends = ({ data }: TrendsProps) => {
  const { shiftTime, creditCardTips, cashTips, hourlyWages } = data;

  const formatValue = (value: string | number) => {
    if (typeof value === "number") {
      return `$ ${value.toFixed(2)}`;
    } else {
      return `$ ${value}`;
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <span style={{ color: "green" }}>{shiftTime}</span>
      <span style={{ color: "red" }}>{formatValue(hourlyWages)}</span>
      <span style={{ color: "blue" }}>{formatValue(creditCardTips)}</span>
      <span style={{ color: "blue" }}>{formatValue(cashTips)}</span>
    </div>
  );
};

export default Trends;
