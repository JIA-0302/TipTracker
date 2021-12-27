import mongoose, { Document, Model, Schema } from "mongoose";

export interface INonHourlyShiftDetails extends Document {
  user_id?: string;
  employer_id?: number;
  shift_date: string;
  total_base_earning?: number;
  credit_card_tips?: number;
  cash_tips?: number;
}

export type NonHourlyShiftDetailsModel = Model<INonHourlyShiftDetails>;

const NonHourlyShiftDetailsSchema = new Schema<
  INonHourlyShiftDetails,
  NonHourlyShiftDetailsModel
>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  shift_date: {
    type: String,
    required: true,
  },
  total_base_earning: Number,
  credit_card_tips: Number,
  cash_tips: Number,
});

export const NonHourlyShiftDetails =
  mongoose.models.nonHourlyShiftDetails ??
  mongoose.model<INonHourlyShiftDetails, NonHourlyShiftDetailsModel>(
    "nonHourlyShiftDetails",
    NonHourlyShiftDetailsSchema
  );
