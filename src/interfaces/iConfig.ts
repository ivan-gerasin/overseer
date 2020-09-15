type Matchers = RegExp[]

export interface IConfigModule {
  name: string
  matchers: Matchers
}

export interface IConfigLayer {
  name: string
  modules: IConfigModule[]
}

export interface IOverseerConfig {
  layers: IConfigLayer[]
}