import mongoose, { Document, Model, Schema } from "mongoose";

export interface IHourlyShiftDetails extends Document {
  user_id?: string;
  employer_id?: number;
  shift_date: string;
  start_time: string;
  end_time: string;
  hourly_wage: number;
  credit_card_tips?: number;
  cash_tips?: number;
}

export type HourlyShiftDetailsModel = Model<IHourlyShiftDetails>;

const HourlyShiftDetailsSchema = new Schema<
  IHourlyShiftDetails,
  HourlyShiftDetailsModel
>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  shift_date: {
    type: String,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  hourly_wage: {
    type: Number,
    required: true,
  },
  credit_card_tips: Number,
  cash_tips: Number,
});

export const HourlyShiftDetails =
  mongoose.models.hourlyShiftDetails ??
  mongoose.model<IHourlyShiftDetails, HourlyShiftDetailsModel>(
    "hourlyShiftDetails",
    HourlyShiftDetailsSchema
  );
