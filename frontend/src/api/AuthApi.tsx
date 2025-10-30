import { isAxiosError } from "axios";
import type { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";
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
export async function ValidateToken(formData: ConfirmToken) {
    try{
        //console.log(formData)
        const url=`/auth/validateToken`
        const {data}=await api.post(url,formData)
        return data
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function updatePasswordWithToken({formData,token}:{formData:NewPasswordForm,token:ConfirmToken['token']}) {
    try{
        //console.log(formData)
        const url=`/auth/update-password/${token}`
        const {data}=await api.post(url,formData)
        return data
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}