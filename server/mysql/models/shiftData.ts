export interface IHourlyShiftDetails {
  shift_id?: number;
  user_id?: number;
  employer_id?: number;
  shift_date: string;
  start_time: string;
  end_time: string;
  hourly_wage: number;
  credit_card_tips?: number;
  cash_tips?: number;
}

export interface INonHourlyShiftDetails {
  shift_id?: number;
  user_id?: number;
  employer_id?: number;
  shift_date: string;
  total_base_earning?: number;
  credit_card_tips?: number;
  cash_tips?: number;
}
