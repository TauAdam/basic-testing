import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from './index';

const initialBalance = 100;
const moneyAmount = 50;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(200)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(200);
    expect(() => account1.transfer(300, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(50, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(initialBalance);
    account.deposit(moneyAmount);
    expect(account.getBalance()).toBe(initialBalance + moneyAmount);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(initialBalance);
    account.withdraw(moneyAmount);
    expect(account.getBalance()).toBe(initialBalance - moneyAmount);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(200);
    account1.transfer(moneyAmount, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(250);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = getBankAccount(initialBalance);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(initialBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
