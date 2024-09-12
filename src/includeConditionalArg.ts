/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies */
/* @ts-expect-error (has no typings) */
import { isEqual } from '@ngard/tiny-isequal';
import { Args, Globals, InputType, Conditional } from './story.js';

const count = (vals: any[]) => vals.map((v) => typeof v !== 'undefined').filter(Boolean).length;

export const testValue = (cond: Omit<Conditional, 'arg' | 'global'>, value: any) => {
  const { exists, eq, neq, truthy } = cond as any;
  if (count([exists, eq, neq, truthy]) > 1) {
    throw new Error(`Invalid conditional test ${JSON.stringify({ exists, eq, neq })}`);
  }
  if (typeof eq !== 'undefined') {
    return isEqual(value, eq);
  }
  if (typeof neq !== 'undefined') {
    return !isEqual(value, neq);
  }
  if (typeof exists !== 'undefined') {
    const valueExists = typeof value !== 'undefined';
    return exists ? valueExists : !valueExists;
  }
  const shouldBeTruthy = typeof truthy === 'undefined' ? true : truthy;
  return shouldBeTruthy ? !!value : !value;
};

/**
 * Helper function to include/exclude an arg based on the value of other other args
 * aka "conditional args"
 */
export const includeConditionalArg = (argType: InputType, args: Args, globals: Globals) => {
  const conditions = Array.isArray(argType.if) ? argType.if : [argType.if];
  
  for (const condition of conditions) {
    if (!condition) continue;

    const { arg, global } = condition as any;
    if (count([arg, global]) !== 1) {
      throw new Error(`Invalid conditional value ${JSON.stringify({ arg, global })}`);
    }

    const value = arg ? args[arg] : globals[global];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!testValue(condition!, value)) {
      return false;
    }
  }
  
  return true;
};
