/* eslint-env jest */

jest.mock('react-native-mmkv', () => {
  const storage = new Map();

  return {
    createMMKV: () => ({
      set: jest.fn((key, value) => storage.set(key, value)),
      getString: jest.fn(key => storage.get(key)),
      remove: jest.fn(key => storage.delete(key)),
      clearAll: jest.fn(() => storage.clear()),
    }),
  };
});

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(() => Promise.resolve(true)),
  getGenericPassword: jest.fn(() =>
    Promise.resolve({
      username: 'wallet-key',
      password: 'wallet-key-test-alias',
    }),
  ),
  resetGenericPassword: jest.fn(() => Promise.resolve(true)),
  ACCESSIBLE: {
    WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'WHEN_UNLOCKED_THIS_DEVICE_ONLY',
  },
  SECURITY_LEVEL: {
    SECURE_HARDWARE: 'SECURE_HARDWARE',
    SECURE_SOFTWARE: 'SECURE_SOFTWARE',
  },
}));

const {TextEncoder, TextDecoder} = require('text-encoding');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;