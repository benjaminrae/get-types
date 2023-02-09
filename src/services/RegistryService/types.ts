import { type ServiceStructure } from "../Service/types";

export interface RegistryData {
  types?: string;
}

export interface RegistryServiceStructure extends ServiceStructure {
  getRegistry: (packageName: string, version: string) => Promise<RegistryData>;
}

export interface Dependency {
  packageName: string;
  packageVersion: string;
  typesVersion: string;
  isInstalled: boolean;
  hasTypes: boolean;
  hasTypesInstalled: boolean;
}

export type Dependecies = Dependency[];
