import mongoose, { Document, Model, Schema } from "mongoose";

export interface IQueue extends Document {
  shift_id: string;
  employer_id: string;
  user_id: string;
  processed: boolean;
}

export type QueueModel = Model<IQueue>;

const QueueSchema = new Schema<IQueue, QueueModel>({
  shift_id: {
    type: Schema.Types.ObjectId,
    ref: "hourlyShiftDetails",
  },
  employer_id: {
    type: Schema.Types.ObjectId,
    ref: "employers",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  processed: {
    type: Boolean,
    default: false,
  },
});

export const Queue =
  mongoose.models.queues ??
  mongoose.model<IQueue, QueueModel>("queues", QueueSchema);
