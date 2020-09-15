import SrcFile from "./srcFile";

describe('SrcFile', () => {

  const innerLevelFile = new SrcFile('core', 0)
  const outerLevelFile = new SrcFile('service', 1)

  test('create instance', () => {
    expect(innerLevelFile).toHaveProperty('name', 'core')
    expect(innerLevelFile).toHaveProperty('level', 0)
    expect(innerLevelFile).toBeInstanceOf(SrcFile)

    expect(outerLevelFile).toHaveProperty('name', 'service')
    expect(outerLevelFile).toHaveProperty('level', 1)
    expect(outerLevelFile).toBeInstanceOf(SrcFile)
  })

  test('canImportFile return true for file with same level or lower', () => {
    expect(innerLevelFile.canImportFile(outerLevelFile)).toBeFalsy()
    expect(innerLevelFile.canImportFile(innerLevelFile)).toBeTruthy()

    expect(outerLevelFile.canImportFile(outerLevelFile)).toBeTruthy()
    expect(outerLevelFile.canImportFile(innerLevelFile)).toBeTruthy()
  })

  test('canBeExporterBy return true for file with same level or higher', () => {
    expect(innerLevelFile.canBeExporterBy(outerLevelFile)).toBeTruthy()
    expect(innerLevelFile.canBeExporterBy(innerLevelFile)).toBeTruthy()

    expect(outerLevelFile.canBeExporterBy(outerLevelFile)).toBeTruthy()
    expect(outerLevelFile.canBeExporterBy(innerLevelFile)).toBeFalsy()
  })
})