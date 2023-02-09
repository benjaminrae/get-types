import mockExpectedDepencies from "../../mocks/mockExpectedDependencies";
import RegistryService from "./RegistryService";

const mockGet = jest.fn().mockImplementation(() => ({ data: null }));

jest.mock("axios", () => ({
  get: async <T>(url: string) => mockGet(url) as Promise<T>,
}));

describe("Given an instance of the class RegistryService initialised with baseUrl 'http://localhost:3000'", () => {
  const baseUrl = "http://localhost:3000";

  describe("When its method getRegistry is invoked with packageName 'supertest' and version 'latest'", () => {
    test("Then axios's method get should be invoked with 'http://localhost:3000/supertest/latest'", async () => {
      const packageName = "supertest";
      const version = "latest";
      const registryServiceInstance = new RegistryService(baseUrl);

      await registryServiceInstance.getRegistry(packageName, version);

      expect(mockGet).toHaveBeenCalledWith(
        `${baseUrl}/${packageName}/${version}`
      );
    });
  });

  describe("When its method getInstalledDependencies is invoked with packageJson folder 'src/mocks'", () => {
    test("Then it should return a list with depencies jest and supertest and jest has the properties hasTypes and hasTypesInstalled true", () => {
      const registryServiceInstance = new RegistryService(baseUrl);
      const mockPackageJsonPath = "src/mocks";

      registryServiceInstance.getInstalledDependencies(mockPackageJsonPath);

      expect(
        // eslint-disable-next-line @typescript-eslint/dot-notation
        registryServiceInstance["installedDependencies"]
      ).toStrictEqual(mockExpectedDepencies);
    });
  });
});
