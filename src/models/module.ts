import {IMatcher} from "../interfaces/IMatcher";
import {IModule} from "../interfaces/iModule";

export class Module implements IModule {
  constructor(public readonly name: string, private readonly matcher: IMatcher) {}

  isFilenameFromModule(fname: string): boolean {
    return this.matcher.filenameBelongsToModule(fname)
  }
}
