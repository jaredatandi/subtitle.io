import axios, { AxiosInstance, AxiosError } from "axios";

export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

class ProtectedAxios {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      withCredentials: true,
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });
    this.setupInterceptors();
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem("token");
        // if (config.data instanceof FormData) {
        //   config.headers["Content-Type"] = "multipart/form-data";
        // } else {
        //   config.headers["Content-Type"] = "application/json";
        // }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error: AxiosError) => {
        console.log("An error in axios:", error);
        return Promise.reject(error);
      }
    );
  }
}

const protectedAxios = new ProtectedAxios();
export const axiosPrivate = protectedAxios.getAxiosInstance();
