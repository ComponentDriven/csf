import { PropertyTypes, StoryProperty } from '.';

describe('properties', () => {
  it('type PropertyTypes.TEXT', () => {
    expect(() => {
      const prop: StoryProperty = {
        type: PropertyTypes.TEXT,
      };
      return prop.type === 'text';
    }).toBeTruthy();
  });
});
