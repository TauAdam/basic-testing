import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((cb) => cb),
}));

const relativePath = './file.js';
describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'create').mockImplementation(() => axios);
    jest
      .spyOn(axios, 'get')
      .mockImplementation(
        () => new Promise((resolve) => resolve({ data: 'responseObj' })),
      );
  });
  test('should create instance with provided base url', async () => {
    jest.useFakeTimers();
    const axiosCreateMock = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axiosCreateMock).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.useFakeTimers();
    const spyGet = jest.spyOn(axios, 'get');
    await throttledGetDataFromApi(relativePath);
    expect(spyGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual('responseObj');
  });
});
