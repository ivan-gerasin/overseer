import {Filename} from "./interfaces/ISrcFile";

export type ModuleName = string
export type LayerName = string
export type ModuleMatcher = RegExp[]

export interface LayerModule {
  name: ModuleName
  matchers: ModuleMatcher
}

export interface LayerConfig {
  name: LayerName
  modules: LayerModule[]
}

export type AppLayers = LayerConfig[]

export interface OverseerConfig {
  layers: AppLayers
}

export type FilenameMatcher = (fname: Filename, r: RegExp) => boolean
export type LayerMatcher = (fname: Filename, layerMatchers: ModuleMatcher) => boolean