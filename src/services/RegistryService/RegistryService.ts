import Service from "../Service/Service";
import {
  type Dependecies,
  type RegistryData,
  type RegistryServiceStructure,
} from "./types";
import fs from "fs";
import path from "path";

class RegistryService extends Service implements RegistryServiceStructure {
  private readonly installedDependencies: Dependecies = [];
  private get typesRegExp() {
    return /^@types\//;
  }

  async getRegistry(packageName: string, version: string) {
    return this.get<RegistryData>(`/${packageName}/${version}`);
  }

  getInstalledDependencies(packageJsonFolder = ".") {
    const packagePath = this.getPackagePath(packageJsonFolder);

    const dependencyList = this.getDependencyList(packagePath);

    dependencyList.forEach((dependency) => {
      let installedDependency = this.getInstalledDependency(dependency);

      if (this.checkIsTypesPackage(dependency)) {
        const nonTypeDepency = dependency.replace(this.typesRegExp, "");

        installedDependency = this.getInstalledDependency(nonTypeDepency);

        if (installedDependency) {
          installedDependency.hasTypes = true;
          installedDependency.hasTypesInstalled = true;
          return;
        }

        this.installedDependencies.push(
          this.createNewTypesDependency(nonTypeDepency)
        );

        return;
      }

      if (installedDependency) {
        installedDependency.isInstalled = true;
        return;
      }

      this.installedDependencies.push(this.createNewDependency(dependency));
    });
  }

  private checkIsTypesPackage(packageName: string) {
    return this.typesRegExp.test(packageName);
  }

  private getInstalledDependency(dependency: string) {
    return this.installedDependencies.find(
      (installedDependency) => installedDependency.packageName === dependency
    );
  }

  private createNewTypesDependency(dependency: string) {
    return {
      packageName: dependency.replace(this.typesRegExp, ""),
      hasTypes: true,
      hasTypesInstalled: true,
      isInstalled: false,
      packageVersion: "",
      typesVersion: "",
    };
  }

  private createNewDependency(dependency: string) {
    return {
      packageName: dependency,
      hasTypes: false,
      hasTypesInstalled: false,
      isInstalled: true,
      packageVersion: "",
      typesVersion: "",
    };
  }

  private getPackagePath(packageJsonFolder: string) {
    return path.join(packageJsonFolder, "package.json");
  }

  private getDependencyList(packagePath: string) {
    const { devDependencies, dependencies } = JSON.parse(
      String(fs.readFileSync(packagePath))
    ) as Record<string, Record<string, string>>;

    return [...Object.keys(dependencies), ...Object.keys(devDependencies)];
  }
}

export default RegistryService;
