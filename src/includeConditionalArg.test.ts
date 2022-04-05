/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { includeConditionalArg, testValue } from './includeConditionalArg';

describe('testValue', () => {
  describe('exists', () => {
    it.each([
      ['implicit exist true', {}, 1, true],
      ['implicit exist false', {}, undefined, false],
      ['explicit exist', { exists: true }, 1, true],
      ['explicit exist false', { exists: true }, undefined, false],
      ['explicit nexist', { exists: false }, undefined, true],
      ['explicit nexist false', { exists: false }, 1, false],
    ])('%s', (_name, cond, value, expected) => {
      // @ts-ignore
      expect(testValue(cond, value)).toBe(expected);
    });
  });
  describe('eq', () => {
    it.each([
      ['true', { eq: 1 }, 1, true],
      ['false', { eq: 1 }, 2, false],
      ['undefined', { eq: undefined }, undefined, false],
      ['undefined false', { eq: 1 }, undefined, false],
      ['object true', { eq: { x: 1 } }, { x: 1 }, true],
      ['object true', { eq: { x: 1 } }, { x: 2 }, false],
    ])('%s', (_name, cond, value, expected) => {
      // @ts-ignore
      expect(testValue(cond, value)).toBe(expected);
    });
  });
  describe('neq', () => {
    it.each([
      ['true', { neq: 1 }, 2, true],
      ['false', { neq: 1 }, 1, false],
      ['undefined true', { neq: 1 }, undefined, true],
      ['undefined false', { neq: undefined }, undefined, false],
      ['object true', { neq: { x: 1 } }, { x: 2 }, true],
      ['object false', { neq: { x: 1 } }, { x: 1 }, false],
    ])('%s', (_name, cond, value, expected) => {
      // @ts-ignore
      expect(testValue(cond, value)).toBe(expected);
    });
  });
});

describe('includeConditionalArg', () => {
  describe('errors', () => {
    it('should throw if arg and global are both specified', () => {
      expect(() =>
        includeConditionalArg({ if: { arg: 'a', global: 'b' } }, {}, {})
      ).toThrowErrorMatchingInlineSnapshot(
        `"Invalid conditional value {\\"arg\\":\\"a\\",\\"global\\":\\"b\\"}"`
      );
    });
    it('should throw if mulitiple exists / eq / neq are specified', () => {
      expect(() =>
        includeConditionalArg({ if: { arg: 'a', exists: true, eq: 1 } }, {}, {})
      ).toThrowErrorMatchingInlineSnapshot(
        `"Invalid conditional test {\\"exists\\":true,\\"eq\\":1}"`
      );

      expect(() =>
        includeConditionalArg({ if: { arg: 'a', exists: false, neq: 0 } }, {}, {})
      ).toThrowErrorMatchingInlineSnapshot(
        `"Invalid conditional test {\\"exists\\":false,\\"neq\\":0}"`
      );

      expect(() =>
        includeConditionalArg({ if: { arg: 'a', eq: 1, neq: 0 } }, {}, {})
      ).toThrowErrorMatchingInlineSnapshot(`"Invalid conditional test {\\"eq\\":1,\\"neq\\":0}"`);
    });
  });

  describe('args', () => {
    describe('exists', () => {
      it.each([
        ['implicit exist true', { if: { arg: 'a' } }, { a: 1 }, {}, true],
        ['implicit exist false', { if: { arg: 'a' } }, {}, {}, false],
        ['explicit exist', { if: { arg: 'a', exists: true } }, { a: 1 }, {}, true],
        ['explicit exist false', { if: { arg: 'a', exists: true } }, {}, {}, false],
      ])('%s', (_name, argType, args, globals, expected) => {
        // @ts-ignore
        expect(includeConditionalArg(argType, args, globals)).toBe(expected);
      });
    });
    describe('eq', () => {
      it.each([
        ['scalar true', { if: { arg: 'a', eq: 1 } }, { a: 1 }, {}, true],
        ['scalar false', { if: { arg: 'a', eq: 1 } }, { a: 2 }, { a: 1 }, false],
      ])('%s', (_name, argType, args, globals, expected) => {
        // @ts-ignore
        expect(includeConditionalArg(argType, args, globals)).toBe(expected);
      });
    });
    describe('neq', () => {
      it.each([
        ['scalar true', { if: { arg: 'a', neq: 1 } }, { a: 2 }, {}, true],
        ['scalar false', { if: { arg: 'a', neq: 1 } }, { a: 1 }, { a: 2 }, false],
      ])('%s', (_name, argType, args, globals, expected) => {
        // @ts-ignore
        expect(includeConditionalArg(argType, args, globals)).toBe(expected);
      });
    });
  });
  describe('globals', () => {
    describe('exists', () => {
      it.each([
        // name, argType, args, globals, expected
        ['implicit exist true', { if: { global: 'a' } }, {}, { a: 1 }, true],
        ['implicit exist false', { if: { global: 'a' } }, { a: 1 }, {}, false],
      ])('%s', (_name, argType, args, globals, expected) => {
        // @ts-ignore
        expect(includeConditionalArg(argType, args, globals)).toBe(expected);
      });
    });
    describe('eq', () => {
      it.each([
        ['scalar true', { if: { global: 'a', eq: 1 } }, {}, { a: 1 }, true],
        ['scalar false', { if: { arg: 'a', eq: 1 } }, { a: 2 }, { a: 1 }, false],
      ])('%s', (_name, argType, args, globals, expected) => {
        // @ts-ignore
        expect(includeConditionalArg(argType, args, globals)).toBe(expected);
      });
    });
    describe('neq', () => {
      it.each([
        ['scalar true', { if: { global: 'a', neq: 1 } }, {}, { a: 2 }, true],
        ['scalar false', { if: { global: 'a', neq: 1 } }, { a: 2 }, { a: 1 }, false],
      ])('%s', (_name, argType, args, globals, expected) => {
        // @ts-ignore
        expect(includeConditionalArg(argType, args, globals)).toBe(expected);
      });
    });
  });
});
