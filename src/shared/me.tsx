import { AxiosResponse } from "axios";
import { http } from "./Http";

export let  mePromise: Promise<AxiosResponse<{
  resource: {
      id: number;
  };
}>>

export const refreshMe = () => {
   mePromise = http.get<{resource: {id: number}}>('/me', {_mock: 'me'})
   console.log(mePromise);
   
   return mePromise
}

export const feachMe = refreshMe
