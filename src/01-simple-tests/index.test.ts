// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const numbers = {
  a: 4,
  b: 5,
};
describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ ...numbers, action: Action.Add });
    expect(result).toBe(9);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ ...numbers, action: Action.Subtract });
    expect(result).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ ...numbers, action: Action.Multiply });
    expect(result).toBe(20);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ ...numbers, action: Action.Divide });
    expect(result).toBe(0.8);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      ...numbers,
      action: Action.Exponentiate,
    });
    expect(result).toBe(1024);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      ...numbers,
      action: '%',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '4',
      b: '5',
      action: Action.Multiply,
    });
    expect(result).toBeNull();
  });
});
