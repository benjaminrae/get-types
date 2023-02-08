import { type AxiosRequestConfig } from "axios";

export interface ServiceStructure {
  get: <T>(path: string, config?: AxiosRequestConfig) => Promise<T>;
}
