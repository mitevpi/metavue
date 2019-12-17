import * as fs from "fs";
import * as path from "path";

export class Util {
  static WriteJson(filePath, data) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(filePath, data, err => {
      if (err) {
        return false;
      }
      console.log("FILE EXPORTED", filePath);
      return true;
    });
  }
}
