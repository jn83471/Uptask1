import { isAxiosError } from "axios";
import type { ConfirmToken, ForgotPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";
import api from "../lib/axios";


export async function createAccount(formData: UserRegistrationForm) {
    try{
        //console.log(formData)
        const url=`/auth/createAuth`
        const {data}=await api.post(url,formData)
        return data
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try{
        //console.log(formData)
        const url=`/auth/confirm-account`
        const {data}=await api.post(url,formData)
        return data
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try{
        //console.log(formData)
        const url=`/auth/request-code`
        const {data}=await api.post(url,formData)
        return data
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function Login(formData: UserLoginForm) {
    try{
        //console.log(formData)
        const url=`/auth/login`
        const {data}=await api.post(url,formData)
        return data
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function ForgotPassword(formData: ForgotPasswordForm) {
    try{
        //console.log(formData)
        const url=`/auth/forgot-password`
        const {data}=await api.post(url,formData)
        return data
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}