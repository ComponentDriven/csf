import { SBType } from './SBType';

export * from './SBType';
export type StoryId = string;
export type ComponentId = string;
export type ComponentTitle = string;
export type StoryName = string;

type A<TF extends Framework> = {
  field: TF['component'];
};

/** @deprecated */
export type StoryKind = ComponentTitle;

export interface StoryIdentifier {
  componentId: ComponentId;
  title: ComponentTitle;
  /** @deprecated */
  kind: ComponentTitle;

  id: StoryId;
  name: StoryName;
  /** @deprecated */
  story: StoryName;
}

export type Parameters = { [name: string]: any };

export type InputType = {
  name?: string;
  description?: string;
  defaultValue?: any;
  type?: SBType | SBType['name'];
  [key: string]: any;
};

export type Args = { [name: string]: any };
export type ArgTypes = { [name: string]: InputType };

export type Globals = { [name: string]: any };
export type GlobalTypes = { [name: string]: InputType };

export type Framework = { component: unknown; storyResult: unknown };
export type StoryContextForEnhancers<TFramework extends Framework> = StoryIdentifier & {
  component?: TFramework['component'];
  subcomponents?: Record<string, TFramework['component']>;

  parameters: Parameters;
  initialArgs: Args;
  argTypes: ArgTypes;
};

export type ArgsEnhancer<TFramework extends Framework> = (
  context: StoryContextForEnhancers<TFramework>
) => Args;
export type ArgTypesEnhancer<TFramework extends Framework> = (
  context: StoryContextForEnhancers<TFramework>
) => ArgTypes & {
  secondPass?: boolean;
};

export type StoryContextUpdate = {
  args: Args;
  globals: Globals;
};

export type ViewMode = 'story' | 'docs';
export type StoryContextForLoaders<TFramework extends Framework> = StoryContextForEnhancers<
  TFramework
> &
  StoryContextUpdate & {
    hooks: unknown;
    viewMode: ViewMode;
    originalStoryFn: StoryFn<TFramework>;
  };

export type LoaderFunction<TFramework extends Framework> = (
  c: StoryContextForLoaders<TFramework>
) => Promise<Record<string, any>>;

export type StoryContext<TFramework extends Framework> = StoryContextForLoaders<TFramework> & {
  loaded: Record<string, any>;
};

// This is the type of story function passed to a decorator -- does not rely on being passed any context
export type PartialStoryFn<TFramework extends Framework> = (
  p?: StoryContextUpdate
) => TFramework['storyResult'];

// This is a passArgsFirst: false user story function
export type LegacyStoryFn<TFramework extends Framework> = (
  p?: StoryContext<TFramework>
) => TFramework['storyResult'];

// This is a passArgsFirst: true user story function
export type ArgsStoryFn<TFramework extends Framework> = (
  a?: Args,
  p?: StoryContext<TFramework>
) => TFramework['storyResult'];

// This is either type of user story function
export type StoryFn<TFramework extends Framework> =
  | LegacyStoryFn<TFramework>
  | ArgsStoryFn<TFramework>;

export type DecoratorFunction<TFramework extends Framework> = (
  fn: PartialStoryFn<TFramework>,
  c: StoryContext<TFramework>
) => TFramework['storyResult'];

export type DecoratorApplicator<TFramework extends Framework> = (
  storyFn: LegacyStoryFn<TFramework>,
  decorators: DecoratorFunction<TFramework>[]
) => LegacyStoryFn<TFramework>;

export type BaseAnnotations<TFramework extends Framework, TArgs = Args> = {
  /**
   * Wrapper components or Storybook decorators that wrap a story.
   *
   * Decorators defined in Meta will be applied to every story variation.
   * @see [Decorators](https://storybook.js.org/docs/addons/introduction/#1-decorators)
   */
  decorators?: DecoratorFunction<TFramework>[];

  /**
   * Custom metadata for a story.
   * @see [Parameters](https://storybook.js.org/docs/basics/writing-stories/#parameters)
   */
  parameters?: Parameters;

  /**
   * Dynamic data that are provided (and possibly updated by) Storybook and its addons.
   * @see [Arg story inputs](https://storybook.js.org/docs/react/api/csf#args-story-inputs)
   */
  args?: Partial<TArgs>;

  /**
   * ArgTypes encode basic metadata for args, such as `name`, `description`, `defaultValue` for an arg. These get automatically filled in by Storybook Docs.
   * @see [Control annotations](https://github.com/storybookjs/storybook/blob/91e9dee33faa8eff0b342a366845de7100415367/addons/controls/README.md#control-annotations)
   */
  argTypes?: ArgTypes;

  /**
   * Asynchronous functions which provide data for a story.
   * @see [Loaders](https://storybook.js.org/docs/react/writing-stories/loaders)
   */
  loaders?: LoaderFunction<TFramework>[];

  /**
   * Define a custom render function for the story(ies). If not passed, a default render function by the framework will be used.
   */
  render?: ArgsStoryFn<TFramework>;

  /**
   * Function that is executed after the story is rendered.
   */
  play?: () => Promise<void>;
};

export type GlobalAnnotations<TFramework extends Framework, TArgs = Args> = BaseAnnotations<
  TFramework,
  TArgs
> & {
  argsEnhancers?: ArgsEnhancer<TFramework>[];
  argTypesEnhancers?: ArgTypesEnhancer<TFramework>[];
  globals?: Globals;
  globalTypes?: GlobalTypes;
  applyDecorators?: DecoratorApplicator<TFramework>;
};

type StoryDescriptor = string[] | RegExp;
export type ComponentAnnotations<TFramework extends Framework, TArgs = Args> = BaseAnnotations<
  TFramework,
  TArgs
> & {
  /**
   * Title of the component which will be presented in the navigation. **Should be unique.**
   *
   * Components can be organized in a nested structure using "/" as a separator.
   *
   * Since CSF 3.0 this property is optional -- it can be inferred from the filesystem path
   *
   * @example
   * export default {
   *   ...
   *   title: 'Design System/Atoms/Button'
   * }
   *
   * @see [Story Hierarchy](https://storybook.js.org/docs/basics/writing-stories/#story-hierarchy)
   */
  title?: ComponentTitle;

  /**
   * Id of the component (prefix of the story id) which is used for URLs.
   *
   * By default is inferred from sanitizing the title
   *
   * @see [Story Hierarchy](https://storybook.js.org/docs/basics/writing-stories/#story-hierarchy)
   */
  id?: ComponentId;

  /**
   * Used to only include certain named exports as stories. Useful when you want to have non-story exports such as mock data or ignore a few stories.
   * @example
   * includeStories: ['SimpleStory', 'ComplexStory']
   * includeStories: /.*Story$/
   *
   * @see [Non-story exports](https://storybook.js.org/docs/formats/component-story-format/#non-story-exports)
   */
  includeStories?: StoryDescriptor;

  /**
   * Used to exclude certain named exports. Useful when you want to have non-story exports such as mock data or ignore a few stories.
   * @example
   * excludeStories: ['simpleData', 'complexData']
   * excludeStories: /.*Data$/
   *
   * @see [Non-story exports](https://storybook.js.org/docs/formats/component-story-format/#non-story-exports)
   */
  excludeStories?: StoryDescriptor;

  /**
   * The primary component for your story.
   *
   * Used by addons for automatic prop table generation and display of other component metadata.
   */
  component?: TFramework['component'];

  /**
   * Auxiliary subcomponents that are part of the stories.
   *
   * Used by addons for automatic prop table generation and display of other component metadata.
   *
   * @example
   * import { Button, ButtonGroup } from './components';
   *
   * export default {
   *   ...
   *   subcomponents: { Button, ButtonGroup }
   * }
   *
   * By defining them each component will have its tab in the args table.
   */
  subcomponents?: Record<string, TFramework['component']>;
};

export type StoryAnnotations<TFramework extends Framework, TArgs = Args> = BaseAnnotations<
  TFramework,
  TArgs
> & {
  /**
   * Override the display name in the UI (CSF v3)
   */
  name?: StoryName;

  /**
   * Override the display name in the UI (CSF v2)
   */
  storyName?: StoryName;

  /** @deprecated */
  story?: Omit<StoryAnnotations<TFramework, TArgs>, 'story'>;
};

type AnnotatedStoryFn<TFramework extends Framework, TArgs = Args> = StoryFn<TFramework> &
  StoryAnnotations<TFramework, TArgs>;

export type StoryAnnotationsOrFn<TFramework extends Framework, TArgs = Args> =
  | AnnotatedStoryFn<TFramework, TArgs>
  | StoryAnnotations<TFramework, TArgs>;
