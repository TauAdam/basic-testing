import { Action, simpleCalculator } from './index';

const numbers = {
  a: 4,
  b: 5,
};
const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { ...numbers, action: Action.Add, expected: 9 },
  { ...numbers, action: Action.Subtract, expected: -1 },
  { ...numbers, action: Action.Divide, expected: 0.8 },
  { ...numbers, action: Action.Multiply, expected: 20 },
  { ...numbers, action: Action.Exponentiate, expected: 1024 },
  { ...numbers, action: '%', expected: null },
  { a: '4', b: '5', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should ${action} ${a} and ${b} correctly`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });
});
