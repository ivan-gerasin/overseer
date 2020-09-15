export interface IModule {
  name: string
  isFilenameFromModule: (fname: string) => boolean
}

