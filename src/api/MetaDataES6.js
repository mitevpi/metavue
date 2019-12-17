// import { Util } from "./Util";

const commentRegex = new RegExp(/\/\*[\s\S]*?\*\//g);

export class MetaDataES6 {
  /**
   * Get the comment tags in the the .vue file.
   * @param fileString The raw text content (string) of the file.
   * @returns {String[]} An array of comment strings from the .vue file.
   */
  static Comments(fileString) {
    const match = fileString.match(commentRegex);
    if (match !== null) {
      return match;
    }
    return [];
  }
}
