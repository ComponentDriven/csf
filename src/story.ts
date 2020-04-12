export type StoryId = string;
export type StoryKind = string;
export type StoryName = string;

export type StoryReturnType<T> = T extends (storyFn: infer StoryFn, context: any) => any
  ? StoryFn extends (...args: any) => any
    ? ReturnType<StoryFn>
    : never
  : never;

export type ParametersType = { [name: string]: any };

export interface KindMeta<Component = unknown, Decorator = unknown> {
  id?: StoryId;
  title: StoryKind;
  component?: Component;
  subcomponents?: Record<string, Component>;
  decorators?: Decorator[];
  parameters?: ParametersType;
}

export interface StoryMeta<Decorator = unknown> {
  (): StoryReturnType<Decorator>;
  story?: {
    name?: StoryName;
    decorators?: Decorator[];
    parameters?: ParametersType;
  };
}
