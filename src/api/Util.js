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
