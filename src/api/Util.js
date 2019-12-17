import * as fs from "fs";
import * as path from "path";

export class Util {
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
}
