import {
  KindMeta as KindMetaBase,
  StoryMeta as StoryMetaBase,
  DecoratorFunction as DecoratorFunctionBase,
  StoryId,
  StoryName,
  StoryKind,
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
type KindMeta<Component = unknown> = KindMetaBase<DecoratorFunction, Component>;
type StoryMeta = StoryMetaBase<Context, StoryFn, DecoratorFunction>;

// NOTE This is examples of using types from @storybook/<framework>

const Button = () => 'Button';
const Input = () => 'Input';

const kind: KindMeta<typeof Button> = {
  id: 'button',
  title: 'Button',
  component: Button,
  subcomponents: { input: Input },
  decorators: [(storyFn, context) => `withDecorator(${storyFn(context)})`],
  parameters: { a: '1', b: 2, c: null },
};

export default kind;

export const Simple: StoryMeta = () => `Once upon a time, there was a ${Button()}...`;
Simple.story = {
  name: 'simple story of lonely button',
  decorators: [(storyFn, context) => `Storyteller: '${storyFn(context)}'`],
  parameters: { d: [], e: {}, f: () => null },
};
