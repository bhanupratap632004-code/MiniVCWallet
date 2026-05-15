/* eslint-env jest */

jest.mock('react-native-mmkv', () => {
  class MockMMKV {
    constructor() {
      this.store = {};
    }

    set(key, value) {
      this.store[key] = String(value);
    }

    getString(key) {
      return this.store[key];
    }

    delete(key) {
      delete this.store[key];
    }

    remove(key) {
      delete this.store[key];
    }

    clearAll() {
      this.store = {};
    }
  }

  return {
    MMKV: MockMMKV,
    createMMKV: () => new MockMMKV(),
  };
});
jest.mock('react-native-keychain', () => {
  let storedCredentials = null;

  return {
    setGenericPassword: jest.fn(async (username, password) => {
      storedCredentials = {
        username,
        password,
      };
      return true;
    }),

    getGenericPassword: jest.fn(async () => {
      return storedCredentials;
    }),

    resetGenericPassword: jest.fn(async () => {
      storedCredentials = null;
      return true;
    }),
  };
});