import { toStartCaseStr } from './toStartCaseStr';

test.each([
  ['snake_case', 'Snake Case'],
  ['camelCase', 'Camel Case'],
  ['camelCase1', 'Camel Case 1'],
  ['camelCase1a', 'Camel Case 1a'],
  ['camelCase1A', 'Camel Case 1A'],
  ['camelCase1A2', 'Camel Case 1A 2'],
  ['camelCase1A2b', 'Camel Case 1A 2b'],
  ['camelCase1A2B', 'Camel Case 1A 2B'],
  ['camelCase1A2B3', 'Camel Case 1A 2B 3'],
  ['__FOOBAR__', 'FOOBAR'],
  ['__FOO_BAR__', 'FOO BAR'],
  [' FOO BAR', 'FOO BAR'],
  ['1. Fooo', '1. Fooo'],
])('%s', (str, expected) => {
  expect(toStartCaseStr(str)).toBe(expected);
});
