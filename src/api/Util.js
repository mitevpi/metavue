import * as fs from "fs";
import * as path from "path";

export class Util {
  /**
   * Export JSON data to the filepath specified.
   * @param filePath The filepath to write to.
   * @param data The JSON-serializable data to write to a .json file.
   * @returns {Promise<Boolean>} True if file export completes successfully.
   */
  static WriteJson(filePath, data) {
    return new Promise((resolve, reject) => {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      fs.writeFile(filePath, data, err => {
        if (err) {
          reject(err);
        }
        console.log("FILE EXPORTED", filePath);
        resolve(true);
      });
    });
  }

  /**
   * Internal RegEx utility - return just the first RegEx match.
   * @param matched The match array returned by the RegEx expression.
   * @returns {null|*} The first matched string, or null (if none).
   */
  static ReturnFirstMatch(matched) {
    if (matched) {
      return matched[0];
    }
    return null;
  }

  /**
   * Get the amount of lines in the given file string.
   * @param text The raw file text content.
   * @returns {number} The number of lines in the file.
   */
  static GetLineLength(text) {
    if (text !== null) {
      return text.split(/\r\n|\r|\n/).length;
    }
    return 0;
  }
}
