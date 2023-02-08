import Service from "./Service";

const mockGet = jest.fn().mockImplementation(async () => ({ data: undefined }));

jest.mock("axios", () => ({
  get: async (path: string): Promise<unknown> =>
    mockGet(path) as Promise<unknown>,
}));

const baseUrl = "http://localhost:3000";

describe("Given the Service class", () => {
  describe("When instantiated with baseUrl 'http://localhost:3000'", () => {
    test("Then it should return an object with that property and value", () => {
      const expectedProperty = "baseUrl";

      const serviceInstance = new Service(baseUrl);

      expect(serviceInstance).toHaveProperty(expectedProperty, baseUrl);
    });
  });
});

describe("Given an instance of the Service class instantiated with baseUrl http://localhost:3000", () => {
  describe("When its method get is invoked with path '/registry'", () => {
    test("Then axios' method get should be invoked with 'http://localhost:3000/registry'", async () => {
      const registryPath = "/registry";
      const serviceInstance = new Service(baseUrl);

      await serviceInstance.get(registryPath);

      expect(mockGet).toHaveBeenCalledWith(`${baseUrl}${registryPath}`);
    });
  });
});
