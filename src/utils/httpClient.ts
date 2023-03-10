import axios, { AxiosResponse, CanceledError } from 'axios';

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
  // should be called after all specific handlers
  static setupGlobalErrorHandler(showError: () => void) {
    instance.interceptors.response.use(response => {
        return response;
      }, (error) => {
        if (error instanceof CanceledError) {
          return;
        }

        showError();
        return Promise.reject(error);
      });
  }

  static setup401Handler(goToLoginPage: () => void) {
    instance.interceptors.response.use(response => {
        return response;
      }, (error) => {
        if (error && error.response && error.response.status === 401) {
          goToLoginPage();
          return;
        }

        return Promise.reject(error);
      });
  }

  static getCancelable<Response>(url: string, aborController?: AbortController): PromiseCancelable<HttpResponse<Response>> {
    const controller = aborController || new AbortController();
    const request = instance.get<Response, AxiosResponse<HttResponseData<Response>>>(url, { signal: controller.signal }).then((response) => {
      return response
        ? {
          status: response.status,
          data: response.data.data
        } as HttpResponse<Response>
        : undefined;
    }) as PromiseCancelable<HttpResponse<Response>>;
  
    request.cancel = () => controller.abort();

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
