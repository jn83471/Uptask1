import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { ProjectFormData } from "../types"

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