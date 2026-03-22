import React,{useEffect,useState} from "react"
import axios from "axios"

function AccessLogs(){

const [logs,setLogs] = useState([])

useEffect(()=>{

axios.get("http://localhost:5000/logs")
.then(res=>{
setLogs(res.data)
})

},[])

return(

<div>

<h3>Access Logs</h3>

<table>

<thead>
<tr>
<th>User Role</th>
<th>Table</th>
<th>Time</th>
</tr>
</thead>

<tbody>

{logs.map(l=>(
<tr key={l.log_id}>
<td>{l.user_role}</td>
<td>{l.table_accessed}</td>
<td>{l.access_time}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}

export default AccessLogs