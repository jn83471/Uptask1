import { useMutation, useQuery } from "@tanstack/react-query"
import { Navigate, useNavigate, useParams, Link } from "react-router-dom"
import { GetProjectById } from "../../api/ProjectApi"
import ProjectForm from "../../components/projects/ProjectForm"
import { useForm } from "react-hook-form"
import type { ProjectFormData } from "../../types"
import { toast } from 'react-toastify'
import EditProjectForm from "../projects/EditProjectForm"

function EditProjectView() {
    const params = useParams()
    const projectId = params.projectId!
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['editprojects', projectId],
        queryFn: () => GetProjectById(projectId),
        retry: false
    })
    
    if (isLoading) return 'Cargando'
    if(data) return <EditProjectForm data={data} projectId={projectId}/>
    return(<></>)
    //if(isError) return <Navigate to='/404}'/>
    
}

export default EditProjectView
