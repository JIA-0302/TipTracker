import { FcCancel } from "react-icons/fc";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

interface ErrorTrendsProps {
  message: string;
}

const ErrorTrends = ({ message }: ErrorTrendsProps) => {
  return (
    <OverlayTrigger
      placement={"top"}
      overlay={<Tooltip id={`tooltip-top`}>{message}</Tooltip>}
    >
      <FcCancel fontSize={48} style={{ margin: "auto" }} />
    </OverlayTrigger>
  );
};

export default ErrorTrends;
