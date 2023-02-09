import RegistryService from "./RegistryService";

const mockGet = jest.fn().mockImplementation(() => ({ data: null }));

jest.mock("axios", () => ({
  get: async <T>(url: string) => mockGet(url) as Promise<T>,
}));

describe("Given an instance of the class RegistryService initialised with baseUrl 'http://localhost:3000'", () => {
  describe("When its method getRegistry is invoked with packageName 'supertest' and version 'latest'", () => {
    test("Then axios's method get should be invoked with 'http://localhost:3000/supertest/latest'", async () => {
      const baseUrl = "http://localhost:3000";
      const packageName = "supertest";
      const version = "latest";
      const registryServiceInstance = new RegistryService(baseUrl);

      await registryServiceInstance.getRegistry(packageName, version);

      expect(mockGet).toHaveBeenCalledWith(
        `${baseUrl}/${packageName}/${version}`
      );
    });
  });
});
