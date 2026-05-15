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

let fallbackWalletKeyAlias: string | null = null;

function isKeychainAvailable() {
  return (
    Keychain &&
    typeof Keychain.getGenericPassword === 'function' &&
    typeof Keychain.setGenericPassword === 'function' &&
    typeof Keychain.resetGenericPassword === 'function'
  );
}

export const SecureKeystoreService = {
  async generateKeyPair(): Promise<KeyGenerationResult> {
    if (!isKeychainAvailable()) {
      if (fallbackWalletKeyAlias) {
        return {
          status: 'KEY_ALREADY_EXISTS',
          keyAlias: fallbackWalletKeyAlias,
          createdAt: new Date().toISOString(),
        };
      }

      fallbackWalletKeyAlias = `wallet-key-${Date.now()}`;

      return {
        status: 'KEY_GENERATED',
        keyAlias: fallbackWalletKeyAlias,
        createdAt: new Date().toISOString(),
      };
    }

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

  async getWalletKeyAlias(): Promise<string> {
    if (!isKeychainAvailable()) {
      if (!fallbackWalletKeyAlias) {
        fallbackWalletKeyAlias = `wallet-key-${Date.now()}`;
      }

      return fallbackWalletKeyAlias;
    }

    const existingKey = await Keychain.getGenericPassword({
      service: WALLET_KEY_SERVICE,
    });

    if (existingKey) {
      return existingKey.password;
    }

    const generatedKey = await this.generateKeyPair();
    return generatedKey.keyAlias;
  },

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

  async clearWalletKey(): Promise<void> {
    fallbackWalletKeyAlias = null;

    if (isKeychainAvailable()) {
      await Keychain.resetGenericPassword({
        service: WALLET_KEY_SERVICE,
      });
    }
  },
};