import * as Keychain from 'react-native-keychain';

export type KeyGenerationResult = {
  status: 'KEY_GENERATED' | 'KEY_ALREADY_EXISTS';
  keyAlias: string;
  createdAt: string;
};

export type SignPayloadResult = {
  keyAlias: string;
  payload: string;
  signature: string;
  signedAt: string;
};

const WALLET_KEY_SERVICE = 'mini-vc-wallet-key-service';
const WALLET_KEY_USERNAME = 'wallet-key-alias';

export const SecureKeystoreService = {
  /**
   * Generates a wallet key alias and stores it in native secure storage.
   * iOS: Keychain
   * Android: Encrypted secure storage through react-native-keychain
   */
  async generateKeyPair(): Promise<KeyGenerationResult> {
    const existingKey = await Keychain.getGenericPassword({
      service: WALLET_KEY_SERVICE,
    });

    if (existingKey) {
      return {
        status: 'KEY_ALREADY_EXISTS',
        keyAlias: existingKey.password,
        createdAt: new Date().toISOString(),
      };
    }

    const keyAlias = `wallet-key-${Date.now()}`;

    await Keychain.setGenericPassword(WALLET_KEY_USERNAME, keyAlias, {
      service: WALLET_KEY_SERVICE,
    });

    return {
      status: 'KEY_GENERATED',
      keyAlias,
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * Returns the stored wallet key alias.
   * If no key exists, it creates one automatically.
   */
  async getWalletKeyAlias(): Promise<string> {
    const existingKey = await Keychain.getGenericPassword({
      service: WALLET_KEY_SERVICE,
    });

    if (existingKey) {
      return existingKey.password;
    }

    const generatedKey = await this.generateKeyPair();
    return generatedKey.keyAlias;
  },

  /**
   * Mock signing method.
   * Real cryptographic signing can be added later.
   */
  async signPayload(payload: string): Promise<SignPayloadResult> {
    const keyAlias = await this.getWalletKeyAlias();
    const signedAt = new Date().toISOString();

    return {
      keyAlias,
      payload,
      signature: `mock_signature_${payload}_${keyAlias}_${Date.now()}`,
      signedAt,
    };
  },

  /**
   * Clears the stored wallet key.
   * Useful for testing reset flow.
   */
  async clearWalletKey(): Promise<void> {
    await Keychain.resetGenericPassword({
      service: WALLET_KEY_SERVICE,
    });
  },
};