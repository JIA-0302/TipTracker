import { query } from "../index";
import { IEmployer } from "../models/employer";

export async function getEmployerById(employerId: number): Promise<IEmployer> {
  const employer = await query(
    `select * from employers where employer_id = ?`,
    [employerId]
  );

  if (employer.length == 1) {
    const { employer_id, employer_name, industry } = employer[0];
    return { employer_id, employer_name, industry } as IEmployer;
  }
  throw Error("Failed to find the specified employer");
}
