import { AxiosResponse } from "axios";
import { http } from "./Http";

export let  mePromise: AxiosResponse<Resource<User>>

export const refreshMe = async () => {
   // , {_mock: 'me'}
   mePromise = await http.get<Resource<User>>('/me')
   console.log(mePromise);
   
   return mePromise
}

export const feachMe = refreshMe
