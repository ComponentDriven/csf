import {
  KindMeta as KindMetaBase,
  StoryMeta as StoryMetaBase,
  DecoratorFunction as DecoratorFunctionBase,
  StoryId,
  StoryName,
  StoryKind,
  DefaultParameters,
} from './story';

// NOTE Types defined in @storybook/addons
type Context = {
  id: StoryId;
  kind: StoryKind;
  name: StoryName;
};

type StoryFn = (c?: Context) => string;

// NOTE This is example of type definition for @storybook/<framework>

type DecoratorFunction = DecoratorFunctionBase<Context, StoryFn>;
type KindMetaWithParams<Parameters, Component = unknown> = KindMetaBase<
  DecoratorFunction,
  Parameters,
  Component
>;
type KindMeta<Component = unknown> = KindMetaWithParams<DefaultParameters, Component>;
type StoryMeta<Parameters = DefaultParameters> = StoryMetaBase<
  Context,
  StoryFn,
  DecoratorFunction,
  Parameters
>;

// NOTE This is examples of using types from @storybook/<framework>

type UserKindMeta<Component> = KindMetaWithParams<{ a: string; b: number; c: null }, Component>;

const Button = () => 'Button';
const Input = () => 'Input';

const kind: UserKindMeta<typeof Button> = {
  id: 'button',
  title: 'Button',
  component: Button,
  subcomponents: { input: Input },
  decorators: [(storyFn, context) => `withDecorator(${storyFn(context)})`],
  parameters: { a: '1', b: 2, c: null },
};

const Simple: StoryMeta<{ d: never[]; e: object; f: Function }> = () =>
  `Once upon a time, there was a ${Button()}...`;
Simple.story = {
  name: 'simple story of lonely button',
  decorators: [(storyFn, context) => `Storyteller: '${storyFn(context)}'`],
  parameters: { d: [], e: {}, f: () => null },
};

const looseKind: KindMeta<typeof Button> = kind;

const strictA: string = kind.parameters?.a ?? '';
const looseA: number = looseKind.parameters?.a;

describe('story', () => {
  test('kinds', () => expect(looseA).toBe(strictA));
});
