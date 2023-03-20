import { AxiosResponse } from "axios";
import { http } from "./Http";

export let  mePromise: Promise< AxiosResponse<Resource<User>>>

export const refreshMe = async () => {
   // , {_mock: 'me'}
   mePromise = http.get<Resource<User>>('/me')
   console.log(mePromise);
   
   return mePromise
}

export const feachMe = refreshMe
