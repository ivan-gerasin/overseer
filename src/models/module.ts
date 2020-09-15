import {IMatcher} from "../interfaces/IMatcher";
import {IModule} from "../interfaces/iModule";
import {IConfigModule} from "../interfaces/iConfig";
import Matcher from "./matcher";

export class Module implements IModule {
  constructor(public readonly name: string, private readonly matcher: IMatcher) {}

  static fromConfig(rawLayer: IConfigModule): Module {
    const matcher = new Matcher(rawLayer.matchers)
    return new Module(rawLayer.name, matcher)
  }

  isFilenameFromModule(fname: string): boolean {
    return this.matcher.filenameBelongsToModule(fname)
  }
}
