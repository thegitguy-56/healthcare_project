const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "healthcare_temporal"
})

db.connect(err => {
  if (err) {
    console.log("Database connection failed")
    return
  }

  console.log("Connected to MySQL")
})

app.get("/patients", (req, res) => {

  const sql = "SELECT * FROM Patient"

  db.query(sql, (err, result) => {

    if (err) {
      res.send(err)
    } else {
      res.json(result)
    }

  })

})

app.get("/treatments/:patientId", authorizeRole(["Admin", "Doctor"]), (req, res) => {

  const patientId = req.params.patientId

  const sql = `
  SELECT treatment_type, medication, valid_from, valid_to
  FROM Treatment_History
  WHERE patient_id = ?
  `

  db.query(sql, [patientId], (err, result) => {

    if (err) {
      res.send(err)
    } else {
      res.json(result)
    }

  })

})

app.get("/active-treatments/:date", (req, res) => {

  const date = req.params.date

  const sql = `
  SELECT *
  FROM Treatment_History
  WHERE ? BETWEEN valid_from AND valid_to
  `

  db.query(sql, [date], (err, result) => {

    if (err) {
      res.send(err)
    } else {
      res.json(result)
    }

  })

})

app.get("/analytics/diseases", (req, res) => {

  const sql = `
  SELECT disease, COUNT(*) AS total
  FROM Diagnosis_History
  GROUP BY disease
  ORDER BY total DESC
  `

  db.query(sql, (err, result) => {

    if (err) {
      res.send(err)
    } else {
      res.json(result)
    }

  })

})

app.get("/dashboard/stats", (req, res) => {

  const stats = {}

  db.query("SELECT COUNT(*) AS totalPatients FROM Patient", (err, result) => {

    stats.totalPatients = result[0].totalPatients

    db.query("SELECT COUNT(*) AS totalDoctors FROM Doctor", (err2, result2) => {

      stats.totalDoctors = result2[0].totalDoctors

      db.query("SELECT COUNT(*) AS totalTreatments FROM Treatment_History", (err3, result3) => {

        stats.totalTreatments = result3[0].totalTreatments

        res.json(stats)

      })

    })

  })

})

app.post("/login",(req,res)=>{

const {username,password} = req.body

const sql = `
SELECT role FROM Users
WHERE username=? AND password=?
`

db.query(sql,[username,password],(err,result)=>{

if(err) return res.send(err)

if(result.length === 0){
return res.json({message:"Invalid login"})
}

res.json({
message:"Login success",
role: result[0].role
})

})

})

function authorizeRole(allowedRoles){

return (req,res,next)=>{

const role = req.headers.role

if(!allowedRoles.includes(role)){
return res.status(403).json({message:"Access denied"})
}

next()

}

}

app.get("/logs",(req,res)=>{

const sql = `
SELECT * FROM Access_Log
ORDER BY access_time DESC
`

db.query(sql,(err,result)=>{

if(err) return res.send(err)

res.json(result)

})

})

// Add new patient
app.post("/patients", (req, res) => {
  const { name, age, gender, address } = req.body;
  const sql = `INSERT INTO Patient (name, age, gender, address) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, age, gender, address], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Failed to add patient", error: err });
    } else {
      res.status(201).json({ message: "Patient added successfully", patientId: result.insertId });
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000")
})