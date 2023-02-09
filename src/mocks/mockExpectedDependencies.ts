import { type Dependecies } from "../services/RegistryService/types";

const mockExpectedDepencies: Dependecies = [
  {
    packageName: "supertest",
    hasTypes: false,
    hasTypesInstalled: false,
    isInstalled: true,
    packageVersion: "",
    typesVersion: "",
  },
  {
    packageName: "express",
    hasTypes: true,
    hasTypesInstalled: true,
    isInstalled: true,
    packageVersion: "",
    typesVersion: "",
  },
  {
    packageName: "node",
    hasTypes: true,
    hasTypesInstalled: true,
    isInstalled: false,
    packageVersion: "",
    typesVersion: "",
  },
  {
    packageName: "jest",
    hasTypes: true,
    hasTypesInstalled: true,
    isInstalled: true,
    packageVersion: "",
    typesVersion: "",
  },
];

export default mockExpectedDepencies;
