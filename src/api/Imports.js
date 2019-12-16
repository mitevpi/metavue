const es6Regex = new RegExp(
  /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w/_-]+)["'\s].*/g
);

const vueCompRegex = new RegExp(/components:\s+?[^}]*}/g);
const vueChunkImportRegex = new RegExp(/(:.+[^>]*>.*import[^)]*[)])/g);

export class Imports {
  /**
   * Extract the strings used to import modules using ES6 syntax.
   * @param fileString The raw text content of the file (.vue).
   * @returns {string[] | boolean | * | RegExpMatchArray | Promise<Response | undefined>} If any ES6 imports are found,
   * the original import strings will be returned.
   */
  static ES6(fileString) {
    return fileString.match(es6Regex);
  }

  /**
   * Extract the imported .vue components in the parent file.
   * @param fileString The raw text content of the file (.vue).
   * @returns {null|string[]} An array of imported .vue components.
   */
  static VueComponents(fileString) {
    let matched = fileString.match(vueCompRegex);
    if (matched) {
      matched = matched[0];
      matched = matched.replace(/components:[^{]*/g, "");
      matched = matched.replace(/[{}]/g, "");
      matched = matched.replace(/\s/g, "");
      // matched = matched.replace(vueChunkImportRegex, "");
      matched = matched.split(",");
      return matched.map(s => {
        const clean = s.replace(vueChunkImportRegex, "");
        return clean;
      });
    }
    return null;
  }
}
