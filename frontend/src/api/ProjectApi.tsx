import { isAxiosError } from "axios"
import api from "../lib/axios"
import { DashboarProjectShecma, projectSchema, type Project, type ProjectFormData } from "../types"

export const CreateProject = async (formData: ProjectFormData) => {
    try {
        const { data } = await api.post("/proyects", formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
        throw new Error("Desde error")
    }
}

export const GetProjects = async () => {
    try {
        const { data } = await api("/proyects")
        console.log(data)
        const response=await DashboarProjectShecma.safeParse(data)
        if(response.success){
            return response.data
        }
        
    }
    catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
        throw new Error("Desde error")
    }
}
export const GetProjectById = async (id: Project['_id']) => {
    try {
        const { data } = await api(`/proyects/${id}`)
        console.log(data)
        const response=await projectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
        console.log("no paso")
        
    }
    catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            return null
            throw new Error(error.response?.data.error)
        }
        return null
        throw new Error("Desde error")
    }
}
type ProjectApyType={
    formData: ProjectFormData,
    projectId: Project['_id']
}
export const UpdateProject = async ({formData,projectId} : ProjectApyType) => {
    try {
        const { data } = await api.put<string>(`/proyects/${projectId}`,formData)
        console.log(data)
        const response=await DashboarProjectShecma.safeParse(data)
        if(response.success){
            return response.data
        }
        
    }
    catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            return null
            throw new Error(error.response?.data.error)
        }
        return null
        throw new Error("Desde error")
    }
}

export const DeleteProject = async (id: Project['_id']) => {
    try {
        const { data } = await api.delete<string>(`/proyects/${id}`)
        return data
        
    }
    catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            return null
            throw new Error(error.response?.data.error)
        }
        return null
        throw new Error("Desde error")
    }
}