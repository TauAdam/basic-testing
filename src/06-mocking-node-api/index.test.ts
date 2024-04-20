import fs from 'fs';
import fsAsync from 'fs/promises';

import path from 'path';
import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './index';

const timeout = 1000;
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should set timeout with provided callback and timeout', () => {
    const spyInstance = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, timeout);
    expect(spyInstance).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should set interval with provided callback and interval', () => {
    const spyInstance = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, timeout);
    expect(spyInstance).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyInstance = jest.spyOn(path, 'join');
    const pathToFile = 'file.js';
    await readFileAsynchronously(pathToFile);
    expect(spyInstance).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously('file.js')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = "I'l be back";
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsAsync, 'readFile').mockResolvedValue(content);
    expect(await readFileAsynchronously('file.js')).toBe(content);
  });
});
