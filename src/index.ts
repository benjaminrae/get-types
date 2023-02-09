import RegistryService from "./services/RegistryService/RegistryService";

const registry = new RegistryService("");

(async () => {
  registry.getInstalledDependencies();
})();
