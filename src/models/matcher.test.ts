import Matcher from "./matcher";

describe('Matcher', () => {
  const rawMatchers = [/\.models\.js/, /\.models\.utils\.js/]
  const matcher = new Matcher(rawMatchers)

  test('create matcher from list of regexp', () => {
    expect(matcher).toBeInstanceOf(Matcher)
    expect(matcher.matchers).not.toBe(rawMatchers)
  })

  test('do expose list of regexps', () => {
    expect(matcher.matchers).toHaveLength(rawMatchers.length)
    matcher.matchers.forEach((r: RegExp, index) => {
      expect(r).toBe(rawMatchers[index])
    })
  })

  test('return true if any of regexp match', () => {
    expect(matcher.filenameBelongsToModule('user.models.js')).toBeTruthy()
  })
})