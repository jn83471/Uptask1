import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import { GetTaskById } from "../../api/TaskApi"
import EditTaskModal from "./EditTaskModal"

export const EditTaskData = () => {
    const location = useLocation()
    const queryParams=new URLSearchParams(location.search)
    const taskId=queryParams.get("taskid")!

    const params=useParams()
    const projectId=params.projectId

    const {data,isError}=useQuery({
        queryKey:['task',taskId],
        queryFn: ()=>GetTaskById({taskId,projectId}),
        enabled:!!taskId,
        retry:3
    })

    if(isError) return <Navigate to={'/404'}/>

    if(data) return<EditTaskModal data={data} taskId={taskId} projectId={projectId}/>
}
