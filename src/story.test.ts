import {
  Args,
  ComponentAnnotations,
  StoryAnnotationsOrFn,
  ProjectAnnotations,
  AnyFramework,
} from './story';

// NOTE Example of internal type definition for @storybook/<X> (where X is a framework)
interface XFramework extends AnyFramework {
  component: (args: this['T']) => string;
  storyResult: string;
}

type XMeta<TArgs = Args> = ComponentAnnotations<XFramework, TArgs>;
type XStory<TArgs = Args> = StoryAnnotationsOrFn<XFramework, TArgs>;

// NOTE Examples of using types from @storybook/<X> in real project

type ButtonArgs = {
  x: string;
  y: string;
};

const Button = (props: ButtonArgs) => 'Button';

// NOTE Various kind usages
const simple: XMeta = {
  title: 'simple',
  component: Button,
  decorators: [(storyFn, context) => `withDecorator(${storyFn(context)})`],
  parameters: { a: () => null, b: NaN, c: Symbol('symbol') },
  loaders: [() => Promise.resolve({ d: '3' })],
  args: { x: '1' },
  argTypes: { x: { type: { name: 'string' } } },
};

const strict: XMeta<ButtonArgs> = {
  title: 'simple',
  component: Button,
  decorators: [(storyFn, context) => `withDecorator(${storyFn(context)})`],
  parameters: { a: () => null, b: NaN, c: Symbol('symbol') },
  loaders: [() => Promise.resolve({ d: '3' })],
  args: { x: '1' },
  argTypes: { x: { type: { name: 'string' } } },
};

// NOTE Various story usages
const Simple: XStory = () => 'Simple';

const CSF1Story: XStory = () => 'Named Story';
CSF1Story.story = {
  name: 'Another name for story',
  decorators: [(storyFn) => `Wrapped(${storyFn()}`],
  parameters: { a: [1, '2', {}], b: undefined, c: Button },
  loaders: [() => Promise.resolve({ d: '3' })],
  args: { a: 1 },
};

const CSF2Story: XStory = () => 'Named Story';
CSF2Story.storyName = 'Another name for story';
CSF2Story.decorators = [(storyFn) => `Wrapped(${storyFn()}`];
CSF2Story.parameters = { a: [1, '2', {}], b: undefined, c: Button };
CSF2Story.loaders = [() => Promise.resolve({ d: '3' })];
CSF2Story.args = { a: 1 };

const CSF3Story: XStory = {
  render: (args) => 'Named Story',
  name: 'Another name for story',
  decorators: [(storyFn) => `Wrapped(${storyFn()}`],
  parameters: { a: [1, '2', {}], b: undefined, c: Button },
  loaders: [() => Promise.resolve({ d: '3' })],
  args: { a: 1 },
};

const CSF3StoryStrict: XStory<ButtonArgs> = {
  render: (args) => 'Named Story',
  name: 'Another name for story',
  decorators: [(storyFn) => `Wrapped(${storyFn()}`],
  parameters: { a: [1, '2', {}], b: undefined, c: Button },
  loaders: [() => Promise.resolve({ d: '3' })],
  args: { x: '1' },
  play: async ({ step }) => {
    await step('a step', async ({ step: substep }) => {
      await substep('a substep', () => {});
    });
  },
};

const project: ProjectAnnotations<XFramework> = {
  async runStep(label, play, context) {
    return play(context);
  },
};

// NOTE Jest forced to define at least one test in file
describe('story', () => {
  test('true', () => expect(true).toBe(true));
});
