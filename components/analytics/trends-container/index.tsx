import { IShiftTrendData } from "src/providers/ShiftTrendsContext";

interface TrendsProps {
  data: IShiftTrendData;
}

const Trends = ({ data }: TrendsProps) => {
  const { shiftTime, creditCardTips, cashTips, hourlyWages } = data;

  return (
    <div className="d-flex flex-column justify-content-center">
      <span style={{ color: "green" }}>{shiftTime}</span>
      <span style={{ color: "red" }}>{hourlyWages}</span>
      <span style={{ color: "blue" }}>{creditCardTips}</span>
      <span style={{ color: "blue" }}>{cashTips}</span>
    </div>
  );
};

export default Trends;
