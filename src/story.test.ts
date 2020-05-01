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

// NOTE Example of internal type definition for @storybook/<framework>

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

// NOTE Examples of using types from @storybook/<framework> in real project

type UserKindMeta<Component> = KindMetaWithParams<{ a: string; b: number; c: null }, Component>;

const Button = () => 'Button';
const Input = () => 'Input';

// NOTE Various kind usages
const simple: KindMeta = {
  title: 'simple',
};

const withUnknownComponent: KindMeta = {
  title: 'component',
  component: Button,
};

const withTypedComponent: KindMeta<typeof Button> = {
  title: 'buttonComponent',
  component: Button,
};

const withDecorator: KindMeta = {
  title: 'withDecorator',
  decorators: [(storyFn, context) => `withDecorator(${storyFn(context)})`],
};

const looseParameters: KindMeta = {
  title: 'looseKind',
  parameters: { a: () => null, b: NaN, c: Symbol('symbol') },
};

const strictParameters: KindMetaWithParams<{ a: number; b: Function; c: Promise<string>[] }> = {
  title: 'strictKind',
  parameters: {
    a: 1,
    b() {
      /* noop */
    },
    c: [Promise.resolve('string')],
  },
};

const complexKind: UserKindMeta<typeof Button> = {
  id: 'button',
  title: 'Button',
  component: Button,
  subcomponents: { input: Input },
  decorators: [(storyFn, context) => `withDecorator(${storyFn(context)})`],
  parameters: { a: '1', b: 2, c: null },
};

// NOTE Various story usages
const Simple: StoryMeta = () => 'Simple';

const NamedStory: StoryMeta = () => 'Named Story';
NamedStory.story = { name: 'Another name for story' };

const DecoratedStory: StoryMeta = () => 'Body';
DecoratedStory.story = {
  decorators: [storyFn => `Wrapped(${storyFn()}`],
};

const LooseStory: StoryMeta = Button;
LooseStory.story = {
  parameters: { a: [1, '2', {}], b: undefined, c: Button },
};

const StrictStory: StoryMeta<{ a: string[]; b: StoryFn; c: DecoratorFunction }> = () => Input();
StrictStory.story = {
  parameters: {
    a: ['1', '2'],
    b: Simple,
    c: (storyFn, context) => `withDecorator(${storyFn(context)})`,
  },
};

const ComplexStory: StoryMeta<{ d: never[]; e: object; f: Function }> = () =>
  `Once upon a time, there was a ${Button()}...`;
Simple.story = {
  name: 'simple story of lonely button',
  decorators: [(storyFn, context) => `Storyteller: '${storyFn(context)}'`],
  parameters: { d: [], e: {}, f: () => null },
};

// NOTE Comparison difference between strict and loose parameters typing
const looseKind: KindMeta<typeof Button> = complexKind;

const strictA: string = complexKind.parameters?.a ?? '';
const looseA: number = looseKind.parameters?.a;

// NOTE Jest forced to define at least one test in file
describe('story', () => {
  test('kinds', () => expect(looseA).toBe(strictA));
});
