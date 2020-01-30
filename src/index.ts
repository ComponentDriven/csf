import startCase from 'lodash/startCase';
import { StoryControls } from './story-controls';

export * from './story-controls';

/**
 * Remove punctuation and illegal characters from a story ID.
 *
 * See https://gist.github.com/davidjrice/9d2af51100e41c6c4b4a
 */
export const sanitize = (string: string) => {
  return (
    string
      .toLowerCase()
      // eslint-disable-next-line no-useless-escape
      .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  );
};

const sanitizeSafe = (string: string, part: string) => {
  const sanitized = sanitize(string);
  if (sanitized === '') {
    throw new Error(`Invalid ${part} '${string}', must include alphanumeric characters`);
  }
  return sanitized;
};

/**
 * Generate a storybook ID from a component/kind and story name.
 */
export const toId = (kind: string, name: string) =>
  `${sanitizeSafe(kind, 'kind')}--${sanitizeSafe(name, 'name')}`;

/**
 * Transform a CSF named export into a readable story name
 */
export const storyNameFromExport = (key: string) => startCase(key);

type StoryDescriptor = string[] | RegExp;
export interface IncludeExcludeOptions {
  includeStories?: StoryDescriptor;
  excludeStories?: StoryDescriptor;
}

function matches(storyKey: string, arrayOrRegex: StoryDescriptor) {
  if (Array.isArray(arrayOrRegex)) {
    return arrayOrRegex.includes(storyKey);
  }
  return storyKey.match(arrayOrRegex);
}

/**
 * Does a named export match CSF inclusion/exclusion options?
 */
export function isExportStory(
  key: string,
  { includeStories, excludeStories }: IncludeExcludeOptions
) {
  return (
    // https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    key !== '__esModule' &&
    (!includeStories || matches(key, includeStories)) &&
    (!excludeStories || !matches(key, excludeStories))
  );
}

export interface SeparatorOptions {
  rootSeparator: string | RegExp;
  groupSeparator: string | RegExp;
}

/**
 * Parse out the component/kind name from a path, using the given separator config.
 */
export const parseKind = (kind: string, { rootSeparator, groupSeparator }: SeparatorOptions) => {
  const [root, remainder] = kind.split(rootSeparator, 2);
  const groups = (remainder || kind).split(groupSeparator).filter(i => !!i);

  // when there's no remainder, it means the root wasn't found/split
  return {
    root: remainder ? root : null,
    groups,
  };
};

/**
 * csf story metadata attached to the story export function
 */
export interface StoryMetadata {
  story?: {
    /**
     * story name if different from the export name
     */
    name?: string;

    /**
     * optional collection of properties, which values
     * will be passed onto the story function
     */
    properties?: StoryControls;

    /**
     * optional collection of story parameters
     */
    parameters?: {
      [key: string]: any;
    };
    /**
     * other fields to add, such as decoratirs
     */
    [key: string]: any;
  };
}
