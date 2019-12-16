import { Files } from "./Files";
import { Imports } from "./Imports";

export class Methods {
  /**
   * Parse the structure of the Vue application and its components.
   * @param directory The directory from which to read .vue files.
   * @returns {Promise<Object[]>} An array of objects containing properties related to the application structure.
   */
  static async ParseStructure(directory) {
    const paths = await Files.GetVue(directory);
    return paths.map(filePath => {
      const text = Files.Read(filePath);
      return {
        path: filePath,
        text,
        imports: Imports.ES6(text),
        components: Imports.VueComponents(text)
      };
    });
  }
}
