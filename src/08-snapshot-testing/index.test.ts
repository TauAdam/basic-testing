import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [0, 1, 2];
    const expectedLinkedList = {
      value: 0,
      next: {
        value: 1,
        next: {
          value: 2,
          next: { value: null, next: null },
        },
      },
    };
    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [4, 5, 6];
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
