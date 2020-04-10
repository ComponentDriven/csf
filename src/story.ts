export type StoryId = string;
export type StoryKind = string;
export type StoryName = string;

type StoryReturnType<T> = T extends (storyFn: infer StoryFn, context: any) => any
  ? StoryFn extends (...args: any) => any
    ? ReturnType<StoryFn>
    : never
  : never;

type DefaultParameters = { [name: string]: unknown };

type ParametersType<T extends { [P: string]: any }> = { [P in keyof T]: T[P] };

export interface KindMeta<
  Component = unknown,
  Parameters = DefaultParameters,
  Decorator = unknown
> {
  id?: StoryId;
  title: StoryKind;
  component?: Component;
  subcomponents?: Record<string, Component>;
  decorators?: Decorator[];
  parameters?: ParametersType<Parameters>;
}

export interface StoryMeta<Parameters = DefaultParameters, Decorator = unknown> {
  (): StoryReturnType<Decorator>;
  story?: {
    name?: StoryName;
    decorators?: Decorator[];
    parameters?: ParametersType<Parameters>;
  };
}
