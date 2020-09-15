import {IConfigModule} from "../interfaces/IConfig";
import {Module} from "./module";
import Matcher from "./matcher";

describe('Module', () => {
  const rawModule: IConfigModule = {
    name: 'models',
    matchers: [/\.models\.js/, /models\.utils\.js/]
  }

  const matcher = new Matcher(rawModule.matchers)
  const module = new Module(rawModule.name, matcher)

  test('create instance of module from config', () => {
    expect(module).toBeInstanceOf(Module)
    expect(module).toHaveProperty('name', rawModule.name)
  })

  test('return true if file belongs to module', () => {
    expect(module.isFilenameFromModule('user.models.js')).toBeTruthy()
    expect(module.isFilenameFromModule('models.utils.js')).toBeTruthy()
    expect(module.isFilenameFromModule('user.services.js')).toBeFalsy()
  })

})