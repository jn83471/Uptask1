import { isAxiosError } from "axios";
import type { UserRegistrationForm } from "../types";
import api from "../lib/axios";


export async function createAccount(formData: UserRegistrationForm) {
    try{
        console.log(formData)
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