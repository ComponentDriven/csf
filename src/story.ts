import { SBType } from './SBType';

export type StoryId = string;
export type ComponentId = string; // TODO -- should this be in storyId?
export type ComponentTitle = string;
export type StoryName = string;

// Deprecated -- TODO - remove?
export type StoryKind = ComponentTitle;

export interface StoryIdentifier {
  id: StoryId;
  kind: ComponentTitle; // deprecated
  title: ComponentTitle;
  name: StoryName;
  story: StoryName; // deprecated
}

export type DefaultParameters = { [name: string]: any };
export type ParametersType<T extends { [P: string]: any } = DefaultParameters> = {
  [P in keyof T]: T[P];
};

export type Parameters = DefaultParameters;

export type Args = { [name: string]: any };
export type ArgType = {
  name?: string;
  description?: string;
  defaultValue?: any;
  type?: SBType;
  [key: string]: any;
};
export type ArgTypes = {
  [name: string]: ArgType;
};
export type Globals = { [name: string]: any };
export type GlobalTypes = { [name: string]: any };

export type StoryContextForEnhancers<Component = unknown> = StoryIdentifier & {
  component?: Component;
  subcomponents?: Record<string, Component>;

  parameters: Parameters;
  initialArgs: Args;
  argTypes: ArgTypes;
};

export type ArgsEnhancer = (context: StoryContextForEnhancers) => Args;
export type ArgTypesEnhancer = (
  context: StoryContextForEnhancers
) => ArgTypes & {
  secondPass?: boolean;
};

export type StoryContextUpdate = {
  args: Args;
  globals: Globals;
  hooks: unknown; // TODO -- should not be accessed?
};

export type StoryContextForLoaders<Component = unknown> = StoryContextForEnhancers<Component> &
  StoryContextUpdate;

export type LoaderFunction = (c: StoryContext) => Promise<Record<string, any>>;

export type StoryContext<Component = unknown> = StoryContextForLoaders<Component> & {
  loaded: Record<string, any>;
};

// This is the type of story function passed to a decorator -- does not rely on being passed any context
export type PartialStoryFn<StoryFnReturnType = unknown> = (
  p?: StoryContextUpdate
) => StoryFnReturnType;

// This is a passArgsFirst: false user story function
export type LegacyStoryFn<StoryFnReturnType = unknown, Component = unknown> = (
  p?: StoryContext<Component>
) => StoryFnReturnType;

// This is a passArgsFirst: true user story function
export type ArgsStoryFn<StoryFnReturnType = unknown, Component = unknown> = (
  a?: Args,
  p?: StoryContext<Component>
) => StoryFnReturnType;

// This is either type of user story function
export type StoryFn<StoryFnReturnType = unknown, Component = unknown> =
  | LegacyStoryFn<StoryFnReturnType, Component>
  | ArgsStoryFn<StoryFnReturnType, Component>;

export type DecoratorFunction<StoryFnReturnType = unknown> = (
  fn: PartialStoryFn<StoryFnReturnType>,
  c: StoryContext
) => ReturnType<LegacyStoryFn<StoryFnReturnType>>;

export type Meta<StoryFnReturnType> = {
  decorators?: DecoratorFunction<StoryFnReturnType>[];
  parameters?: Parameters;
  args?: Args;
  argTypes?: ArgTypes;
  loaders?: LoaderFunction[];
  render?: ArgsStoryFn<StoryFnReturnType>;
  play?: () => Promise<void>; // TODO -- should this take story context?
};

export type GlobalMeta<StoryFnReturnType> = Meta<StoryFnReturnType> & {
  argsEnhancers?: ArgsEnhancer[];
  argTypesEnhancers?: ArgTypesEnhancer[];
  globals?: Globals;
  globalTypes?: GlobalTypes;
};

type StoryDescriptor = string[] | RegExp;
export type ComponentMeta<StoryFnReturnType> = Meta<StoryFnReturnType> & {
  title: ComponentTitle;
  id?: ComponentId;
  includeStories?: StoryDescriptor;
  excludeStories?: StoryDescriptor;
  component?: any;
  subcomponents?: Record<string, any>;
};

export type StoryMeta<StoryFnReturnType> = Meta<StoryFnReturnType> & {
  id: StoryId;
  name: StoryName;
};
