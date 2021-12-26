import mongoose, { Schema, Model, Document } from "mongoose";

export interface IEmployer extends Document {
  employer_name: string;
  industry: string;
}

export type EmployerModel = Model<IEmployer>;

const EmployerSchema = new Schema<IEmployer, EmployerModel>({
  employer_name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
});

export const Employer =
  mongoose.models.employers ??
  mongoose.model<IEmployer, EmployerModel>("employers", EmployerSchema);
