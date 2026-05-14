import {createMMKV} from 'react-native-mmkv';

export const walletStorage = createMMKV({
  id: 'wallet-storage',
});

export const saveWalletKeyAlias = (alias: string) => {
  walletStorage.set('walletKeyAlias', alias);
};

export const getWalletKeyAlias = () => {
  return walletStorage.getString('walletKeyAlias');
};

export const clearWallet = () => {
  walletStorage.clearAll();
};