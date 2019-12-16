import * as fs from "fs";
import * as path from "path";

export class Files {
  /**
   * Get all the Vue files in the input directory (collects files in nested folders too).
   * @param directory The directory to search for .vue files in.
   * @returns {Promise<String[]>} An array of file paths of .vue files.
   */
  static async GetVue(directory) {
    const dirEntries = await fs.readdirSync(directory, { withFileTypes: true });
    const files = await Promise.all(
      dirEntries.map(dirEntry => {
        const res = path.resolve(directory, dirEntry.name);
        return dirEntry.isDirectory() ? this.GetVue(res) : res;
      })
    );
    return Array.prototype.concat(...files).filter(f => f.endsWith(".vue"));
  }

  /**
   * Get the raw text data of a file.
   * @param filePath The path the file is at.
   * @returns {string} Raw text content of the file.
   */
  static Read(filePath) {
    return fs.readFileSync(filePath, "utf8");
  }
}
