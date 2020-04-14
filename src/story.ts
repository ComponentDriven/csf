export type StoryId = string;
export type StoryKind = string;
export type StoryName = string;

export type StoryFnType<Context, ReturnType> = (context?: Context) => ReturnType;

export type DecoratorFunction<Context, StoryFn extends StoryFnType<Context, any>> = (
  fn: StoryFn,
  context: Context
) => ReturnType<StoryFn>;

export type ParametersType = { [name: string]: any };

export interface KindMeta<Decorator extends DecoratorFunction<any, any>, Component = unknown> {
  id?: StoryId;
  title: StoryKind;
  component?: Component;
  subcomponents?: Record<string, Component>;
  decorators?: Decorator[];
  parameters?: ParametersType;
}

export interface StoryMeta<
  Context,
  StoryFn extends StoryFnType<Context, any>,
  Decorator extends DecoratorFunction<Context, StoryFn>
> {
  (context?: Context): ReturnType<StoryFn>;
  story?: {
    name?: StoryName;
    decorators?: Decorator[];
    parameters?: ParametersType;
  };
}
