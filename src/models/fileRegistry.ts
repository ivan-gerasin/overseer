import IFileRegistry from "../interfaces/IFileRegistry";
import {Filename} from "../interfaces/ISrcFile";
import ILayerRegistry from "../interfaces/ILayerRegistry";
import SrcFile from "./srcFile";

interface IFileInRegistry {
  [fname: string]: boolean
}

export default class FileRegistry implements IFileRegistry {

  private registry = new Map<Filename, SrcFile>([])
  private fileLayerRegistryCache: IFileInRegistry = {}

  constructor(private layerRegistry: ILayerRegistry) {}

  isDependencyValid(fname: Filename, deps: Filename[]): boolean {
    const mainFileIsSrc = this.isFileInLayerRegistry(fname)
    if (!mainFileIsSrc) {
      return false
    }

    const everyDepIsSrc = deps.every(this.isFileInLayerRegistry)
    if (!everyDepIsSrc) {
      return false
    }

    if (!this.registry.has(fname)) {
      this.addFileToRegistry(fname)
    }
    deps.forEach((depName) => {
      if (!this.registry.has(depName)) {
        this.addFileToRegistry(depName)
      }
    })

    // Cast to SrcFile because above we already created a record in registry
    const mainFile = this.registry.get(fname) as SrcFile
    return deps.every((depName) => {
      const depFile = this.registry.get(fname) as SrcFile
      return mainFile.canImportFile(depFile)
    })
  }

  private isFileInLayerRegistry(fname: Filename): boolean {
    if (fname in this.fileLayerRegistryCache) {
      return this.fileLayerRegistryCache[fname]
    }
    const fileIsFromRegistry = this.layerRegistry.isFileFromRegistry(fname)
    this.fileLayerRegistryCache[fname] = fileIsFromRegistry
    return fileIsFromRegistry
  }

  private addFileToRegistry(fname: Filename) {
    const level = this.layerRegistry.getLayerLevelForFile(fname)
    const file = new SrcFile(fname, level)
    this.registry.set(fname, file)
  }
}