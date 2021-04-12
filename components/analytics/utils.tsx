import {
  FcClock,
  FcMoneyTransfer,
  FcCurrencyExchange,
  FcCalculator,
} from "react-icons/fc";
import { HiCreditCard } from "react-icons/hi";

export const KEY_ICONS = {
  shiftTime: {
    icon: <FcClock />,
    name: "Shift Time",
  },
  wages: {
    icon: <FcMoneyTransfer />,
    name: "Wages",
  },
  creditCardTips: {
    icon: <HiCreditCard />,
    name: "Credit Card Tips",
  },
  cashTips: {
    icon: <FcCurrencyExchange />,
    name: "Cash Tips",
  },
  totalTips: {
    icon: <FcCalculator />,
    name: "Total Tips",
  },
};
