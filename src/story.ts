import type { RemoveIndexSignature, Simplify, UnionToIntersection } from 'type-fest';
import type { SBScalarType, SBType } from './SBType';

export * from './SBType.js';
export type StoryId = string;
export type ComponentId = string;
export type ComponentTitle = string;
export type StoryName = string;

/** @deprecated */
export type StoryKind = ComponentTitle;

export type Tag = string;

export interface StoryIdentifier {
  componentId: ComponentId;
  title: ComponentTitle;
  /** @deprecated */
  kind: ComponentTitle;

  id: StoryId;
  name: StoryName;
  /** @deprecated */
  story: StoryName;

  tags: Tag[];
}

export interface Parameters {
  [name: string]: any;
}

export interface StrictParameters {
  [name: string]: unknown;
}

type ConditionalTest = { truthy?: boolean } | { exists: boolean } | { eq: any } | { neq: any };
type ConditionalValue = { arg: string } | { global: string };
export type Conditional = ConditionalValue & ConditionalTest;
export interface InputType {
  name?: string;
  description?: string;
  defaultValue?: any;
  type?: SBType | SBScalarType['name'];
  if?: Conditional;
  [key: string]: any;
}

export interface StrictInputType extends InputType {
  name: string;
  type?: SBType;
}

export interface Args {
  [name: string]: any;
}

export interface StrictArgs {
  [name: string]: unknown;
}

export type ArgTypes<TArgs = Args> = { [name in keyof TArgs]: InputType };
export type StrictArgTypes<TArgs = Args> = { [name in keyof TArgs]: StrictInputType };

export type Globals = { [name: string]: any };
export type GlobalTypes = { [name: string]: InputType };
export type StrictGlobalTypes = { [name: string]: StrictInputType };

export type Renderer = {
  /** What is the type of the `component` annotation in this renderer? */
  component: unknown;

  /** What does the story function return in this renderer? */
  storyResult: unknown;

  /** What type of element does this renderer render to? */
  canvasElement: unknown;

  // A generic type T that can be used in the definition of the component like this:
  // component: (args: this['T']) => string;
  // This generic type will eventually be filled in with TArgs
  // Credits to Michael Arnaldi.
  T?: unknown;
};

/** @deprecated - use `Renderer` */
export type AnyFramework = Renderer;

export type StoryContextForEnhancers<
  TRenderer extends Renderer = Renderer,
  TArgs = Args
> = StoryIdentifier & {
  component?: (TRenderer & { T: any })['component'];
  subcomponents?: Record<string, (TRenderer & { T: any })['component']>;
  parameters: Parameters;
  initialArgs: TArgs;
  argTypes: StrictArgTypes<TArgs>;
};

export type ArgsEnhancer<TRenderer extends Renderer = Renderer, TArgs = Args> = (
  context: StoryContextForEnhancers<TRenderer, TArgs>
) => TArgs;
export type ArgTypesEnhancer<TRenderer extends Renderer = Renderer, TArgs = Args> = ((
  context: StoryContextForEnhancers<TRenderer, TArgs>
) => StrictArgTypes<TArgs>) & {
  secondPass?: boolean;
};

export type StoryContextUpdate<TArgs = Args> = {
  args?: TArgs;
  globals?: Globals;
  // NOTE: it is currently possibly to add *any* key you like to the context
  // (although you cannot override the basic keys). This will likely be removed in future.
  [key: string]: any;
};

export type ViewMode = 'story' | 'docs';
export type StoryContextForLoaders<
  TRenderer extends Renderer = Renderer,
  TArgs = Args
> = StoryContextForEnhancers<TRenderer, TArgs> &
  Required<StoryContextUpdate<TArgs>> & {
    hooks: unknown;
    viewMode: ViewMode;
    originalStoryFn: StoryFn<TRenderer>;
  };

export type LoaderFunction<TRenderer extends Renderer = Renderer, TArgs = Args> = (
  context: StoryContextForLoaders<TRenderer, TArgs>
) => Promise<Record<string, any>>;

export type StoryContext<
  TRenderer extends Renderer = Renderer,
  TArgs = Args
> = StoryContextForLoaders<TRenderer, TArgs> & {
  loaded: Record<string, any>;
  abortSignal: AbortSignal;
  canvasElement: TRenderer['canvasElement'];
};

export type StepLabel = string;

export type StepFunction<TRenderer extends Renderer = Renderer, TArgs = Args> = (
  label: StepLabel,
  play: PlayFunction<TRenderer, TArgs>
) => Promise<void> | void;

export type PlayFunctionContext<TRenderer extends Renderer = Renderer, TArgs = Args> = StoryContext<
  TRenderer,
  TArgs
> & {
  step: StepFunction<TRenderer, TArgs>;
};

export type PlayFunction<TRenderer extends Renderer = Renderer, TArgs = Args> = (
  context: PlayFunctionContext<TRenderer, TArgs>
) => Promise<void> | void;

// This is the type of story function passed to a decorator -- does not rely on being passed any context
export type PartialStoryFn<TRenderer extends Renderer = Renderer, TArgs = Args> = (
  update?: StoryContextUpdate<Partial<TArgs>>
) => TRenderer['storyResult'];

// This is a passArgsFirst: false user story function
export type LegacyStoryFn<TRenderer extends Renderer = Renderer, TArgs = Args> = (
  context: StoryContext<TRenderer, TArgs>
) => TRenderer['storyResult'];

// This is a passArgsFirst: true user story function
export type ArgsStoryFn<TRenderer extends Renderer = Renderer, TArgs = Args> = (
  args: TArgs,
  context: StoryContext<TRenderer, TArgs>
) => (TRenderer & { T: TArgs })['storyResult'];

// This is either type of user story function
export type StoryFn<TRenderer extends Renderer = Renderer, TArgs = Args> =
  | LegacyStoryFn<TRenderer, TArgs>
  | ArgsStoryFn<TRenderer, TArgs>;

export type DecoratorFunction<TRenderer extends Renderer = Renderer, TArgs = Args> = (
  fn: PartialStoryFn<TRenderer, TArgs>,
  c: StoryContext<TRenderer, TArgs>
) => TRenderer['storyResult'];

export type DecoratorApplicator<TRenderer extends Renderer = Renderer, TArgs = Args> = (
  storyFn: LegacyStoryFn<TRenderer, TArgs>,
  decorators: DecoratorFunction<TRenderer, TArgs>[]
) => LegacyStoryFn<TRenderer, TArgs>;

export type StepRunner<TRenderer extends Renderer = Renderer, TArgs = Args> = (
  label: StepLabel,
  play: PlayFunction<TRenderer, TArgs>,
  context: PlayFunctionContext<TRenderer, TArgs>
) => Promise<void>;

export type BaseAnnotations<TRenderer extends Renderer = Renderer, TArgs = Args> = {
  /**
   * Wrapper components or Storybook decorators that wrap a story.
   *
   * Decorators defined in Meta will be applied to every story variation.
   * @see [Decorators](https://storybook.js.org/docs/addons/introduction/#1-decorators)
   */
  decorators?: DecoratorFunction<TRenderer, TArgs>[];

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
  argTypes?: Partial<ArgTypes<TArgs>>;

  /**
   * Asynchronous functions which provide data for a story.
   * @see [Loaders](https://storybook.js.org/docs/react/writing-stories/loaders)
   */
  loaders?: LoaderFunction<TRenderer, TArgs>[];

  /**
   * Define a custom render function for the story(ies). If not passed, a default render function by the renderer will be used.
   */
  render?: ArgsStoryFn<TRenderer, TArgs>;
};

export type ProjectAnnotations<
  TRenderer extends Renderer = Renderer,
  TArgs = Args
> = BaseAnnotations<TRenderer, TArgs> & {
  argsEnhancers?: ArgsEnhancer<TRenderer, Args>[];
  argTypesEnhancers?: ArgTypesEnhancer<TRenderer, Args>[];
  globals?: Globals;
  globalTypes?: GlobalTypes;
  applyDecorators?: DecoratorApplicator<TRenderer, Args>;
  runStep?: StepRunner<TRenderer, TArgs>;
};

type StoryDescriptor = string[] | RegExp;
export interface ComponentAnnotations<TRenderer extends Renderer = Renderer, TArgs = Args>
  extends BaseAnnotations<TRenderer, TArgs> {
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
  component?: (TRenderer & {
    // We fall back to `any` when TArgs is missing (and so TArgs will be Args).
    // We also fallback to `any` for any other "top" type (Record<string, any>, Record<string, unknown>, any, unknown).
    // This is because you can not assign Component with more specific props, to a Component that accepts anything

    // For example this won't compile
    // const Button: FC<Args> = (props: {prop: number} ) => {}
    //
    // Note that the subtyping relationship is inversed for T and (t: T) => any. As this is fine:
    // const args: Args = { prop: 1 };
    // The correct way would probably to fall back to `never`, being the inverse of unknown. Or maybe `Record<string, never>`
    //
    // Any is really weird as it pretends to be never and unknown at the same time (so being the absolute bottom and top type at the same time)
    // However, I don't have the guts to fallback to Record<string, never>, forgive me.
    //
    // If this all doesn't make sense, you may want to look at the test: You can assign a component to Meta, even when you pass a top type.
    T: Record<string, unknown> extends Required<TArgs> ? any : TArgs;
  })['component'];

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
  subcomponents?: Record<string, TRenderer['component']>;

  /**
   * Function that is executed after the story is rendered.
   */
  play?: PlayFunction<TRenderer, TArgs>;

  /**
   * Named tags for a story, used to filter stories in different contexts.
   */
  tags?: Tag[];
}

export type StoryAnnotations<
  TRenderer extends Renderer = Renderer,
  TArgs = Args,
  TRequiredArgs = Partial<TArgs>
> = BaseAnnotations<TRenderer, TArgs> & {
  /**
   * Override the display name in the UI (CSF v3)
   */
  name?: StoryName;

  /**
   * Override the display name in the UI (CSF v2)
   */
  storyName?: StoryName;

  /**
   * Function that is executed after the story is rendered.
   */
  play?: PlayFunction<TRenderer, TArgs>;

  /**
   * Named tags for a story, used to filter stories in different contexts.
   */
  tags?: Tag[];

  /** @deprecated */
  story?: Omit<StoryAnnotations<TRenderer, TArgs>, 'story'>;
  // eslint-disable-next-line @typescript-eslint/ban-types
} & ({} extends TRequiredArgs ? { args?: TRequiredArgs } : { args: TRequiredArgs });

export type LegacyAnnotatedStoryFn<TRenderer extends Renderer = Renderer, TArgs = Args> = StoryFn<
  TRenderer,
  TArgs
> &
  StoryAnnotations<TRenderer, TArgs>;

export type LegacyStoryAnnotationsOrFn<TRenderer extends Renderer = Renderer, TArgs = Args> =
  | LegacyAnnotatedStoryFn<TRenderer, TArgs>
  | StoryAnnotations<TRenderer, TArgs>;

export type AnnotatedStoryFn<TRenderer extends Renderer = Renderer, TArgs = Args> = ArgsStoryFn<
  TRenderer,
  TArgs
> &
  StoryAnnotations<TRenderer, TArgs>;

export type StoryAnnotationsOrFn<TRenderer extends Renderer = Renderer, TArgs = Args> =
  | AnnotatedStoryFn<TRenderer, TArgs>
  | StoryAnnotations<TRenderer, TArgs>;

export type ArgsFromMeta<TRenderer extends Renderer, Meta> = Meta extends {
  render?: ArgsStoryFn<TRenderer, infer RArgs>;
  loaders?: (infer Loaders)[];
  decorators?: (infer Decorators)[];
}
  ? Simplify<
      RemoveIndexSignature<
        RArgs & DecoratorsArgs<TRenderer, Decorators> & LoaderArgs<TRenderer, Loaders>
      >
    >
  : unknown;

type DecoratorsArgs<TRenderer extends Renderer, Decorators> = UnionToIntersection<
  Decorators extends DecoratorFunction<TRenderer, infer TArgs> ? TArgs : unknown
>;

type LoaderArgs<TRenderer extends Renderer, Loaders> = UnionToIntersection<
  Loaders extends LoaderFunction<TRenderer, infer TArgs> ? TArgs : unknown
>;
