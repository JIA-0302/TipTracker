import { Employer, IEmployer } from "../models/employer";

export async function getEmployerById(employerId: number): Promise<IEmployer> {
  const employer = await Employer.findById(employerId);

  if (employer) {
    return employer;
  }

  throw Error("Failed to find the specified employer");
}
