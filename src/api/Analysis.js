import { Files } from "./Files";
import { MetaDataVue } from "./MetaDataVue";
import { MetaDataES6 } from "./MetaDataES6";
import { MetaDataCSS } from "./MetaDataCSS";
import { Util } from "./Util";

export class Analysis {
  /**
   * Parse the structure of the Vue application and its components.
   * @param directory The directory from which to read .vue files.
   * @returns {Promise<Object[]>} An array of objects containing properties related to the application structure.
   */
  static async Architecture(directory) {
    const paths = await Files.GetVue(directory);
    return paths.map(filePath => {
      const text = Files.Read(filePath);
      const data = MetaDataVue.VueData(text);
      const template = MetaDataVue.VueTemplate(text);
      const script = MetaDataVue.VueScript(text);
      const style = MetaDataVue.VueStyle(text);
      const comments = MetaDataES6.Comments(text);
      const cssClasses = MetaDataCSS.Classes(style);
      const cssIdSelectors = MetaDataCSS.IdSelectors(style);
      return {
        path: filePath,
        name: filePath.replace(/^.*[\\/]/, "").replace(".vue", ""),
        text,
        lines: Util.GetLineLength(text),
        imports: MetaDataVue.ES6(text),
        data,
        dataCount: data.length,
        components: MetaDataVue.VueComponents(text),
        template,
        script,
        style,
        comments,
        cssClasses,
        cssIdSelectors,
        templateLength: Util.GetLineLength(template),
        scriptLength: Util.GetLineLength(script),
        styleLength: Util.GetLineLength(style),
        commentLength: comments.length,
        cssClassesCount: cssClasses.length,
        cssIdSelectorsCount: cssIdSelectors.length
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
}
