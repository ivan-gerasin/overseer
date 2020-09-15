import {IMatcher} from "../interfaces/IMatcher";
import {Filename} from "../interfaces/ISrcFile";

export default class Matcher implements IMatcher {
  public readonly matchers: RegExp[]
  constructor(matcher: RegExp[]) {
    this.matchers = [...matcher]
  }
  filenameBelongsToModule(fname: Filename): boolean {
    return this.matchers.some(r => r.test(fname))
  }
}