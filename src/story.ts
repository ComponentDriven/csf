export type StoryId = string;
export type StoryKind = string;
export type StoryName = string;

export type StoryFnType<Context, ReturnType> = (context?: Context) => ReturnType;

export type DecoratorFunction<Context, StoryFn extends StoryFnType<Context, any>> = (
  fn: StoryFn,
  context: Context
) => ReturnType<StoryFn>;

export type DefaultParameters = { [name: string]: any };

export type ParametersType<T extends { [P: string]: any } = DefaultParameters> = {
  [P in keyof T]: T[P];
};

export interface KindMeta<
  Decorator extends DecoratorFunction<any, any>,
  Parameters extends ParametersType,
  Component = unknown
> {
  id?: StoryId;
  title: StoryKind;
  component?: Component;
  subcomponents?: Record<string, Component>;
  decorators?: Decorator[];
  parameters?: Parameters;
}

export interface StoryMeta<
  Context,
  StoryFn extends StoryFnType<Context, any>,
  Decorator extends DecoratorFunction<Context, StoryFn>,
  Parameters extends ParametersType
> {
  (context?: Context): ReturnType<StoryFn>;
  story?: {
    name?: StoryName;
    decorators?: Decorator[];
    parameters?: Parameters;
  };
}
