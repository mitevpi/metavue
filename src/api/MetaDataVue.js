import { Util } from "./Util";

const es6Regex = new RegExp(
  /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w/_-]+)["'\s].*/g
);

// const hugeRegex = new RegExp(/export.default[^;]*/g);
const vueCompRegex = new RegExp(/components:\s+?[^}]*}/g);
const vueTemplateRegex = new RegExp(/<template>([\s\S]*)<\/template>/g);
const vueScriptRegex = new RegExp(/<script>([\s\S]*)<\/script>/g);
const vueStyleRegex = new RegExp(/<style([\s\S]*)<\/style>/g);

const vueDataMacroRegex = new RegExp(/data:\s+?[^}]*}/g);
const vueDataMicroRegex = new RegExp(/([a-zA-Z])\w+:/g);
const vueChunkImportRegex = new RegExp(/(:.+[^>]*>.*import[^)]*[)])/g);

export class MetaDataVue {
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
      matched = matched.split(",");
      return matched.map(s => {
        return s.replace(vueChunkImportRegex, "");
      });
    }
    return null;
  }

  /**
   * Get the entire string within the <template> tag in the .vue file.
   * @param fileString The raw text content (string) of the file.
   * @returns {String} The <template> string from the .vue file.
   */
  static VueTemplate(fileString) {
    const matched = fileString.match(vueTemplateRegex);
    return Util.ReturnFirstMatch(matched);
  }

  /**
   * Get the entire string within the <script> tag in the .vue file.
   * @param fileString The raw text content (string) of the file.
   * @returns {String} The <script> string from the .vue file.
   */
  static VueScript(fileString) {
    const matched = fileString.match(vueScriptRegex);
    return Util.ReturnFirstMatch(matched);
  }

  /**
   * Get the entire string within the <style> tag in the .vue file.
   * @param fileString The raw text content (string) of the file.
   * @returns {String} The <style> string from the .vue file.
   */
  static VueStyle(fileString) {
    const matched = fileString.match(vueStyleRegex);
    return Util.ReturnFirstMatch(matched);
  }

  /**
   * Extract the imported data properties in the parent file.
   * @param fileString The raw text content of the file (.vue).
   * @returns {null|string[]} An array of declared data variables in the component.
   */
  static VueData(fileString) {
    let matched = fileString.match(vueDataMacroRegex);
    if (matched) {
      matched = matched[0].match(vueDataMicroRegex);
      matched = matched.map(d => {
        return d.replace(":", "");
      });
      return [...new Set(matched)];
    }
    return [];
  }
}
