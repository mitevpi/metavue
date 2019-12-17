// import * as fs from "fs";
import * as path from "path";

import { Files } from "./Files";
import { Imports } from "./Imports";
import { Util } from "./Util";

export class Methods {
  /**
   * Parse the structure of the Vue application and its components.
   * @param directory The directory from which to read .vue files.
   * @returns {Promise<Object[]>} An array of objects containing properties related to the application structure.
   */
  static async Architecture(directory) {
    const paths = await Files.GetVue(directory);
    return paths.map(filePath => {
      const text = Files.Read(filePath);
      return {
        path: filePath,
        name: filePath.replace(/^.*[\\/]/, "").replace(".vue", ""),
        text,
        imports: Imports.ES6(text),
        data: Imports.VueData(text),
        components: Imports.VueComponents(text)
      };
    });
  }

  /**
   * Parse parent-child relationships between components.
   * @param directory The directory from which to read .vue files.
   * @returns {Promise<[]>} An array of objects with parent & child properties - one for each nested relationship.
   */
  static async ParentChild(directory) {
    const result = await this.Architecture(directory);
    const resultArray = [];
    result.map(component => {
      if (component.components) {
        component.components.map(imported => {
          resultArray.push({ parent: component.name, child: imported });
        });
      }
    });
    return resultArray;
  }

  /**
   * Parse & export parent-child relationships between components to JSON.
   * @param directory The directory from which to read .vue files.
   * @returns {Boolean} True if the file export succeeded, false if there was an error.
   */
  static async ExportParentChild(directory) {
    const result = await this.ParentChild(directory);
    const data = JSON.stringify(result, null, 4);
    const filePath = path.join(directory, "ParentChildData.json");
    return Util.WriteJson(filePath, data);
  }

  /**
   * Parse & export structural relationships between components to JSON.
   * @param directory The directory from which to read .vue files.
   * @returns {Boolean} True if the file export succeeded, false if there was an error.
   */
  static async ExportArchitecture(directory) {
    const result = await this.Architecture(directory);
    result.forEach(v => {
      delete v.text;
    });
    const data = JSON.stringify(result, null, 4);
    const filePath = path.join(directory, "ComponentArchitecture.json");
    return Util.WriteJson(filePath, data);
  }
}
