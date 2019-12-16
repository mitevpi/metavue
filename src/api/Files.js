import * as fs from "fs";
import * as path from "path";

export class Files {
  // static GetVue(path) {
  //   const vueFiles = [];
  //   fs.readdirSync(path).forEach(file => {
  //     console.log(file);
  //     vueFiles.push(file);
  //   });
  //   return vueFiles;
  // }

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
    return Array.prototype.concat(...files).filter(f => f.includes(".vue"));
  }

  static async Read(filePath) {
    fs.readFile(filePath, "utf8", async (err, data) => {
      if (err) throw err;
      await data;
    });
  }
}
