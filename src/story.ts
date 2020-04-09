export type StoryId = string;
export type StoryKind = string;
export type StoryName = string;

type StoryReturnType<T> = T extends (storyFn: infer StoryFn, context: any) => any
  ? StoryFn extends (...args: any) => any
    ? ReturnType<StoryFn>
    : never
  : never;

export interface KindMeta<Component = unknown, Decorator = unknown> {
  id?: StoryId;
  title: StoryKind;
  component?: Component;
  subcomponents?: unknown; // TODO
  decorators?: Decorator[];
  parameters?: {
    [name: string]: unknown;
  };
}

export interface StoryMeta<Decorator = unknown> {
  (): StoryReturnType<Decorator>;
  story?: {
    name?: StoryName;
    decorators?: Decorator[];
    parameters?: {
      [name: string]: unknown;
    };
  };
}
