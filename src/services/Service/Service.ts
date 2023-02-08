import axios, { type AxiosRequestConfig } from "axios";
import { type ServiceStructure } from "./types";

class Service implements ServiceStructure {
  constructor(private readonly baseUrl: string) {}

  async get<T>(path: string, config?: AxiosRequestConfig) {
    const response = await axios.get<T>(`${this.baseUrl}${path}`, config);

    return response.data;
  }
}

export default Service;
