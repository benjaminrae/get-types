import { type ServiceStructure } from "../Service/types";

export interface RegistryData {
  types?: string;
}

export interface RegistryServiceStructure extends ServiceStructure {
  getRegistry: (packageName: string, version: string) => Promise<RegistryData>;
}
