import mongoose from "mongoose";
const { Schema } = mongoose;

const futureTrendsSchema = new Schema({
  user_id: { type: Number, required: true },
  shift_date: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  credit_card_tips: { type: Number, default: 0 },
  cash_tips: { type: Number, default: 0 },
  hourly_wage: { type: Number, required: true },
  week_of_month: { type: String, required: true },
  day_of_week: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
  industry: { type: String, required: true },
  hash: { type: String, required: true },
});

const FutureTrends =
  mongoose.models.future_trends ??
  mongoose.model("future_trends", futureTrendsSchema);

export default FutureTrends;
