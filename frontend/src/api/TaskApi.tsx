import { isAxiosError } from "axios"
import api from "../lib/axios"

import { TaskFormData, TaskSchema, type Project, type Task } from "../types"

type TaskAPI={
    formData:TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    status:Task['status']
}

export async function CreateTask({formData,projectId}:Pick<TaskAPI, 'formData'|'projectId'>) {
    try {
        const { data } = await api.post<string>(`/proyects/${projectId}/tasks`, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
        throw new Error("Desde error")
    }
}

export const GetTaskById = async ({projectId,taskId}:Pick<TaskAPI,'projectId'|'taskId'>) => {
    try {
        const { data } = await api(`/proyects/${projectId}/tasks/${taskId}`)
        console.log(data)
        const response=await TaskSchema.safeParse(data)
        if(response.success){
            return response.data
        }
        console.log("no paso")
        
    }
    catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            console.log(new Error(error.response?.data.error))
            throw new Error(error.response?.data.error)
        }
        throw new Error("Desde error")
    }
}
export const updateTask = async ({projectId,taskId,formData }:Pick<TaskAPI,'projectId'|'taskId'|'formData'>) => {
    try {
        const { data } = await api.put<string>(`/proyects/${projectId}/tasks/${taskId}`,formData)
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

export const DeleteTask = async ({projectId,taskId }:Pick<TaskAPI,'projectId'|'taskId'>) => {
    try {
        const { data } = await api.delete<string>(`/proyects/${projectId}/tasks/${taskId}`)
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

export const ChangeStatus = async ({projectId,taskId,status }:Pick<TaskAPI,'projectId'|'taskId'|'status'>) => {
    try {
        const { data } = await api.post<string>(`/proyects/${projectId}/tasks/${taskId}/status`,{status})
        return data
        
    }
    catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
        throw new Error("Desde error")
    }
}