import Service from "../Service/Service";
import { type RegistryData, type RegistryServiceStructure } from "./types";

class RegistryService extends Service implements RegistryServiceStructure {
  async getRegistry(packageName: string, version: string) {
    return this.get<RegistryData>(`/${packageName}/${version}`);
  }
}

export default RegistryService;
