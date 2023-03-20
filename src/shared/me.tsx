import { AxiosResponse } from "axios";
import { http } from "./Http";

export let  mePromise: AxiosResponse<Resource<User>>

export const refreshMe = async () => {
   mePromise = await http.get<Resource<User>>('/me', {_mock: 'me'})
   console.log(mePromise);
   
   return mePromise
}

export const feachMe = refreshMe
