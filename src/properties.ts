/**
 * Property field types
 * examples are propvided for the different types:
 *
 */
export enum FieldTypes {
  /**
   * userName: {
   *   type: csf.FieldTypes.TEXT,
   *   label: 'Name',
   *   defaultValue: 'Storyteller',
   * },
   */
  TEXT = 'text',

  /**
   *  age: {
   *   type: csf.FieldTypes.NUMBER,
   *   label: 'Age',
   *   defaultValue: 78,
   *   range: true,
   *   min: 0,
   *   max: 90,
   *   step: 5,
   * },
   */
  NUMBER = 'number',

  /**
   * nice: {
   *  type: csf.FieldTypes.BOOLEAN,
   *  label: 'Nice',
   *  defaultValue: true,
   * },
   */
  BOOLEAN = 'boolean',

  /**
   * fruit: {
   *   type: csf.FieldTypes.OPTIONS,
   *   label: 'Fruit',
   *   defaultValue: 'apple',
   *   options: {
   *     Apple: 'apple',
   *     Banana: 'banana',
   *     Cherry: 'cherry',
   *   },
   * },
   */
  OPTIONS = 'options',

  /**
   *  birthday: {
   *   type: csf.FieldTypes.DATE,
   *   label: 'Birthday',
   *   defaultValue: new Date(),
   *  },
   */
  DATE = 'date',

  /**
   * color: {
   *   type: 'color',
   *   defaultValue: '#000000',
   * },
   */
  COLOR = 'color',

  /**
   * button: {
   *  type: csf.FieldTypes.BUTTON,
   *   onClick: () => {
   *    ... code to modify some variables
   *  }
   * },
   */
  BUTTON = 'button',

  /**
   * otherStyles: {
   *   type: csf.FieldTypes.OBJECT,
   *   label: 'Styles',
   *   defaultValue: {
   *     border: '2px dashed silver',
   *     borderRadius: 10,
   *     padding: 10,
   *   },
   * },
   */
  OBJECT = 'object',

  /**
   * items: {
   *   type: csf.FieldTypes.ARRAY,
   *   label: 'Items',
   *   defaultValue: ['Laptop', 'Book', 'Whiskey'],
   * },
   */
  ARRAY = 'array',

  /**
   * images: {
   *   type: csf.FieldTypes.FILES,
   *   label: 'Happy Picture',
   *   accept: 'image/*',
   *   defaultValue: [
   *     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiARwMCyEWcOFPAAAAP0lEQVQoz8WQMQoAIAwDL/7/z3GwghSp4KDZyiUpBMCYUgd8rehtH16/l3XewgU2KAzapjXBbNFaPS6lDMlKB6OiDv3iAH1OAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAxLTI4VDEyOjExOjMzLTA3OjAwlAHQBgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMS0yOFQxMjoxMTozMy0wNzowMOVcaLoAAAAASUVORK5CYII=',
   *   ],
   * },
   */
  FILES = 'files',
}

export interface StoryPropertyObject {
  type?: FieldTypes;

  /**
   * label to display next to the field editor
   * by default uses the property name itself
   */

  label?: string;

  /**
   * placehlder for empty properties
   * either undefined defautValue
   * or user clears the field
   */
  placeholder?: string;

  /**
   * a default value for the property
   */
  defaultValue?: any;

  /**
   * hide the label from the property editor
   */
  hideLabel?: boolean;
  /**
   * hide the property editor for this property
   * will only use the defaultValue
   */

  hidden?: boolean;
  /**
   * allows grouping of the properties
   * in a property editor
   * for example different editor tabs
   */
  groupId?: string;

  // FIELD TYPE SPECIFIC
  /**
   * for button type fields, an onClick handler
   */
  onClick?: () => any;

  /**
   * for options type fields
   */

  display?: 'select' | 'radio' | 'inline-radio' | 'multi-select' | 'check' | 'inline-check';

  /**
   * for numeric type fields
   */

  /**
   * if true, will display a range type slider editor
   */
  range?: boolean;

  /**
   * minimum allowed value for numeric propery
   */
  min?: number;

  /**
   * maximum allowed value for numeric propery
   */
  max?: number;

  /**
   * stepper for numeric editor /i nc/dec value
   */

  step?: number;
}

/**
 * StoryProperty is a either an object of property settings
 * or a shortcut can be used:
 *  properties: {
 *   text: 'Hello',
 * },
 */

export type StoryProperty = StoryPropertyObject | string;

/**
 * StoryProperties are defined in key value pairs
 * the name of the property is the key
 * and the value is the StoryProperty
 */
export interface StoryProperties {
  [name: string]: StoryProperty;
}

export type StoryPropertiesArray = StoryProperty[];

/**
 * StoryValues are passed into the story function
 * either the default value or
 * if a property editor is installed, can be modified
 */
export interface StoryValues {
  [name: string]: any;
}
