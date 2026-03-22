import React,{useState} from "react"
import axios from "axios"

function TreatmentHistory(){

const [patientId,setPatientId] = useState("")
const [treatments,setTreatments] = useState([])

const fetchTreatments = ()=>{

axios.get(`http://localhost:5000/treatments/${patientId}`)
.then(res=>{
setTreatments(res.data)
})

}

return(

<div>

<h2>Treatment History</h2>

<input
placeholder="Enter Patient ID"
value={patientId}
onChange={(e)=>setPatientId(e.target.value)}
/>

<button onClick={fetchTreatments}>
Load Treatments
</button>

<ul>

{treatments.map((t,i)=>(
<li key={i}>
{t.treatment_type} ({t.valid_from} → {t.valid_to})
</li>
))}

</ul>

</div>

)

}

export default TreatmentHistory