import {createMMKV} from 'react-native-mmkv';
import {VerifiableCredential} from '../types/credential';

export const credentialStorage = createMMKV({
  id: 'credential-storage',
});

export const saveCredential = (credential: VerifiableCredential) => {
  credentialStorage.set('credential', JSON.stringify(credential));
};

export const getCredential = (): VerifiableCredential | null => {
  const data = credentialStorage.getString('credential');

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const clearCredential = () => {
  credentialStorage.remove('credential');
};