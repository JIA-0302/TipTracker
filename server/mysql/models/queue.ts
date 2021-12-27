import { Document } from "mongoose";

export interface IQueue extends Document {
  shift_id: string;
  employer_id: string;
  user_id: string;
  processed?: number;
}
