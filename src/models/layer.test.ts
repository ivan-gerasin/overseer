import {IConfigLayer} from "../interfaces/IConfig";
import Layer from "./layer";

describe('Layer', () => {
  const rawCurrentLayer: IConfigLayer = {
    name: 'core',
    modules: [
      {
        name: 'models',
        matchers: [/\.models\.js/, /models\.utils\.js/]
      },
      {
        name: 'interfaces',
        matchers: [/\.interfaces\.js/]
      }
    ]
  }
  const rawOuterLayer: IConfigLayer = {
    name: 'services',
    modules: [
      {
        name: 'services',
        matchers: [/\.services\.js/, /services\.utils\.js/]
      },
      {
        name: 'fetchers',
        matchers: [/\.fetchers\.js/]
      }
    ]
  }

  const layer = Layer.fromConfig(rawCurrentLayer, 1)
  const outerLayer = Layer.fromConfig(rawOuterLayer, 2)

  test('create instance from config', () => {
    expect(layer).toBeInstanceOf(Layer)
  })

  test('isFilenameFromLayer return true if filename belongs to layer', () => {
    expect(layer.isFilenameFromLayer('users.models.js')).toBeTruthy()
    expect(layer.isFilenameFromLayer('models.utils.js')).toBeTruthy()

    expect(layer.isFilenameFromLayer('user.interfaces.js')).toBeTruthy()

    expect(layer.isFilenameFromLayer('user.services.js')).toBeFalsy()
  })

  test('isInnerLayer return true, if provided layer is inner to current', () => {
    expect(outerLayer.isInnerLayer(layer)).toBeTruthy()
    expect(layer.isInnerLayer(outerLayer)).toBeFalsy()
  })

  test('isOuterLayer return true, if provided layer is outer to current', () => {
    expect(outerLayer.isOuterLayer(layer)).toBeFalsy()
    expect(layer.isOuterLayer(outerLayer)).toBeTruthy()
  })

})