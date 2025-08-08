import { isAxiosError } from "axios"
import api from "../lib/axios"
import { DashboarProjectShecma, type ProjectFormData } from "../types"

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