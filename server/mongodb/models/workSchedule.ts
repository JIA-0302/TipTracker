import mongoose, { Model, Document, Schema } from "mongoose";

export interface IWorkSchedule extends Document {
  employer_id: string;
  user_id: string;
  shift_date: string;
  start_time: string;
  end_time: string;
}

export type WorkScheduleModel = Model<IWorkSchedule>;

const WorkScheduleSchema = new Schema<IWorkSchedule, WorkScheduleModel>({
  employer_id: {
    type: Schema.Types.ObjectId,
    ref: "employers",
  },
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
});

export const WorkSchedule =
  mongoose.models.workSchedules ??
  mongoose.model<IWorkSchedule, WorkScheduleModel>(
    "workSchedules",
    WorkScheduleSchema
  );
