import * as path from "path";

import { Util } from "./Util";
import { Analysis } from "./Analysis";

export class Exports {
  /**
   * Parse & export parent-child relationships between components to JSON.
   * @param directory The directory from which to read .vue files.
   * @returns {Boolean} True if the file export succeeded, false if there was an error.
   */
  static async ExportParentChild(directory) {
    const result = await Analysis.ParentChild(directory);
    const data = JSON.stringify(result, null, 4);
    const filePath = path.join(directory, ".metavue", "ParentChildData.json");
    return Util.WriteJson(filePath, data);
  }

  /**
   * Parse & export structural relationships between components to JSON.
   * @param directory The directory from which to read .vue files.
   * @returns {Boolean} True if the file export succeeded, false if there was an error.
   */
  static async ExportArchitecture(directory) {
    const result = await Analysis.Architecture(directory);
    result.forEach(v => {
      delete v.text;
      delete v.template;
      delete v.script;
      delete v.style;
    });
    const data = JSON.stringify(result, null, 4);
    const filePath = path.join(
      directory,
      ".metavue",
      "ComponentArchitecture.json"
    );
    return Util.WriteJson(filePath, data);
  }
}
