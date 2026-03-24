const fs = require("fs")
const mysql = require("mysql2/promise")

async function run() {
  const sql = fs.readFileSync("sample_seed_data.sql", "utf8")

  const statementsCount = (sql.match(/;/g) || []).length

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "healthcare_temporal",
    multipleStatements: true,
  })

  await db.query(sql)

  const [p] = await db.query("SELECT COUNT(*) AS c FROM Patient")
  const [d] = await db.query("SELECT COUNT(*) AS c FROM Diagnosis_History")
  const [t] = await db.query("SELECT COUNT(*) AS c FROM Treatment_History")
  const [u] = await db.query("SELECT COUNT(*) AS c FROM Users")
  const [l] = await db.query("SELECT COUNT(*) AS c FROM Access_Log")

  console.log(
    JSON.stringify(
      {
        executedStatements: statementsCount,
        statementsInFile: statementsCount,
        counts: {
          Patient: p[0].c,
          Diagnosis_History: d[0].c,
          Treatment_History: t[0].c,
          Users: u[0].c,
          Access_Log: l[0].c,
        },
      },
      null,
      2
    )
  )

  await db.end()
}

run().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
