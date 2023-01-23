import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: process.env.API_URL,
});

instance.interceptors.request.use(request => {
  const token = localStorage.getItem('token');
  if (token) {
    request.params = request.params || {};
    request.params.token = token;
  }
  
  return request;
});

// instance.interceptors.response.use(response => {
//   if (response.status === 401) {

//   }
  
//   return response;
// });

type HttpRequestParams = {
  signal: {
    aborted: boolean
  }
};

export type HttpResponse<T> = { status: number, data: T };
export type HttResponseData<T> = { success: boolean, data: T };

export interface PromiseCancelable<T> extends Promise<T> {
  cancel: () => void;
}

export type HttpAbortableRequest<T> = { run: () => Promise<HttpResponse<T>>, abort: () => void };

export default class HttpClient {
  static getCancelable<Response>(url: string): PromiseCancelable<HttpResponse<Response>> {
    const controller = new AbortController();
    const request = instance.get<Response, AxiosResponse<HttResponseData<Response>>>(url, { signal: controller.signal }).then((response) => {
      return {
        status: response.status,
        data: response.data.data
      } as HttpResponse<Response>;
    }) as PromiseCancelable<HttpResponse<Response>> ;
  
    request.cancel = controller.abort;

    return request;
  }


  static async get<Response>(url: string, parameters?: HttpRequestParams) {
    const response = await instance.get<Response, AxiosResponse<HttResponseData<Response>>>(url, parameters);
    return {
      status: response.status,
      data: response.data.data
    } as HttpResponse<Response>;
  }

  static async post<RequestPayLoad, Response>(url: string, body: RequestPayLoad) {
    const response = await instance.post<RequestPayLoad, AxiosResponse<HttResponseData<Response>>>(url, body);
    return {
      status: response.status,
      data: response.data.data
    } as HttpResponse<Response>;
  }

  static delete(url: string) {
    return instance.delete(url);
  }
}
