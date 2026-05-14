import {saveWalletKeyAlias, getWalletKeyAlias} from '../../storage/walletStorage';

const createMockSignature = (payload: string, keyAlias: string) => {
  const timestamp = Date.now();

  return `mock_signature_${payload}_${keyAlias}_${timestamp}`;
};

export class SecureKeystoreService {
  static async generateKeyPair() {
    const keyAlias = `wallet-key-${Date.now()}`;

    saveWalletKeyAlias(keyAlias);

    return {
      keyAlias,
      status: 'KEY_GENERATED',
    };
  }

  static async getKeyAlias() {
    return getWalletKeyAlias();
  }

  static async signPayload(payload: string) {
    const keyAlias = getWalletKeyAlias();

    if (!keyAlias) {
      throw new Error('Wallet key not found');
    }

    const signature = createMockSignature(payload, keyAlias);

    return {
      keyAlias,
      payload,
      signature,
    };
  }
}