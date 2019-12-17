const classRegex = new RegExp(/(\.[a-z_-][\w-]*)(?=[^{}]*{)/g);
const idSelectorRegex = new RegExp(/(#[a-z_-][\w-]*)(?=[^{}]*{)/g);

export class MetaDataCSS {
  /**
   * Get the css classes in the the .vue file.
   * @param fileString The raw text content (string) of the file.
   * @returns {String[]} An array of css classes strings from the .vue file.
   */
  static Classes(fileString) {
    const match = fileString !== null ? fileString.match(classRegex) : null;
    return match !== null ? match : [];
  }

  /**
   * Get the css id selectors in the the .vue file.
   * @param fileString The raw text content (string) of the file.
   * @returns {String[]} An array of css id selector strings from the .vue file.
   */
  static IdSelectors(fileString) {
    const match =
      fileString !== null ? fileString.match(idSelectorRegex) : null;
    return match !== null ? match : [];
  }
}
