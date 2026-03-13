import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function UserQueries(){

const [queries,setQueries] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

const fetchQueries = async ()=>{

const token = localStorage.getItem("token");

const res = await fetch(
"http://localhost:5000/api/admin/queries",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data = await res.json();

if(data.success){

setQueries(data.queries);

}

};

fetchQueries();

},[]);

return(

<DashboardLayout title="User Queries">

<table className="w-full bg-white shadow rounded">

<thead>

<tr className="border-b">

<th className="p-3 text-left">Email</th>
<th className="p-3 text-left">Phone</th>
<th className="p-3 text-left">User Type</th>
<th className="p-3 text-left">Action</th>

</tr>

</thead>

<tbody>

{queries.map(q=>(
<tr key={q.id} className="border-b">

<td className="p-3">{q.email}</td>
<td className="p-3">{q.phone}</td>
<td className="p-3">{q.user_type}</td>

<td className="p-3">

<button
onClick={()=>navigate(`/admin/query/${q.id}`)}
className="text-blue-600 underline"
>

View Details

</button>

</td>

</tr>
))}

</tbody>

</table>

</DashboardLayout>

);

}