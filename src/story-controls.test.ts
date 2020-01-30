import { ControlTypes, StoryControl } from '.';

describe('properties', () => {
  it('type PropertyTypes.TEXT', () => {
    expect(() => {
      const prop: StoryControl = {
        type: ControlTypes.TEXT,
      };
      return prop.type === 'text';
    }).toBeTruthy();
  });
});
