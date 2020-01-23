import { FieldTypes, StoryProperty } from '.';

describe('properties', () => {
  it('type FieldTypes.TEXT', () => {
    expect(() => {
      const prop: StoryProperty = {
        type: FieldTypes.TEXT,
      };
      return prop.type === 'text';
    }).toBeTruthy();
  });
});
