import {IOverseerConfig} from "../interfaces/iConfig";
import {moduleFromConfig} from "./config";

describe('Config logic', () => {

  const config: IOverseerConfig = {
    layers: [
      {name: 'Core', modules: [
          {name: 'Models', matchers: [/\.models\.js/]}
        ]},
      {name: 'Logic', modules: [
          {name: 'Services', matchers: [/\.services\.js/]}
        ]},
      {name: 'Misc', modules: [
          {name: 'Controllers', matchers: [/\.controllers\.js/]},
          {name: 'Views', matchers: [/\.views\.js/]}
        ]}
    ]
  }

  test('moduleFromConfig creates Module', () => {
    const fakeModelsModule = config.layers[0].modules[0]
    let module = moduleFromConfig(fakeModelsModule)
    expect(module).toHaveProperty('name', fakeModelsModule.name)
    expect(module.isFilenameFromModule('user.models.js')).toBeTruthy()
    expect(module.isFilenameFromModule('user.services.js')).toBeFalsy()

    const fakeServiceModule = config.layers[1].modules[0]
    module = moduleFromConfig(fakeServiceModule)
    expect(module).toHaveProperty('name', fakeServiceModule.name)
    expect(module.isFilenameFromModule('user.models.js')).toBeFalsy()
    expect(module.isFilenameFromModule('user.services.js')).toBeTruthy()
  })



})