export interface IHourlyShiftDetails {
  shift_id?: number;
  user_id?: number;
  employer_id?: number;
  shift_date: Date;
  start_time: Date;
  end_time: Date;
  hourly_wage: number;
  credit_card_tips?: number;
  cash_tips?: number;
}

export interface INonHourlyShiftDetails {
  shift_id?: number;
  user_id?: number;
  employer_id?: number;
  shift_date: Date;
  total_base_earnings?: number;
  credit_card_tips?: number;
  cash_tips?: number;
}
