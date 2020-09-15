import Layer from "../models/layer";
import {IOverseerConfig} from "../interfaces/IConfig";


export function layersFromConfig(config: IOverseerConfig): Layer[] {
  return config.layers.map(Layer.fromConfig)
}