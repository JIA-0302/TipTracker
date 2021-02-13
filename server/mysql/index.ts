import mysql from "serverless-mysql"

export const db = mysql({
  config: {
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
})

export async function query(
  q: string,
  values: (string | number)[] | string | number = []
) {
  try {
    const results = await db.query(q, values)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}
