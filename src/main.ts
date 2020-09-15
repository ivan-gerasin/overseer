import {AppLayers, Filename, ModuleMatcher} from "./types";


export function getMatchers(layers: AppLayers): ModuleMatcher[] {
  return layers.map(({matchers}) => matchers)
}

function createFilenameTester(fname: Filename) {
  return (r: RegExp) => r.test(fname)
}

function isMatching(fname: Filename, matchers: ModuleMatcher[]) {
  const tester = createFilenameTester(fname)
  return matchers.map(lMatchers => lMatchers.some(tester))
}



