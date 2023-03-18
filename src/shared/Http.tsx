import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { mockSession, mockTagIndex } from "../mock/mock";

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
  }
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
  }
  // create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?:PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  // destroy
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}

const mock = (response: AxiosResponse) => {
  if (location.hostname !== 'localhost' 
  && location.hostname !== '127.0.0.1'
  && location.hostname !== '192.168.3.57') {return false}
  switch (response.config?.params?._mock) {
    case 'session':
      [response.status, response.data] = mockSession(response.config)
      return true
      case 'tagIndex':
        [response.status, response.data] = mockTagIndex(response.config)        
        return true
  }
}

export const http = new Http('api/v1')

http.instance.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
})

// 拦截回复，并mock mock返回false则退出拦截
http.instance.interceptors.response.use((response) => {
  mock(response)
  return response
}, (error) => {
  // 如果可以mock则mock错误,否则报错
  if (mock(error.response)) {
    return error.response
  } else {
    throw error
  }
})

http.instance.interceptors.response.use(response => {
  return response
}, (err) => {
  if(err.response) {
    const axiosError = err as AxiosError
    if (axiosError.response?.status === 429) {
      alert('频繁请求')
    }
  }
  throw err
})