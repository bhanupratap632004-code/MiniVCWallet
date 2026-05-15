import * as Keychain from 'react-native-keychain';

export type WalletKeyPairResult = {
  status: 'KEY_GENERATED';
  keyAlias: string;
  publicKey: string;
  createdAt: string;
};

export type WalletSignatureResult = {
  keyAlias: string;
  payload: string;
  signature: string;
  signedAt: string;
};

const WALLET_KEYCHAIN_SERVICE = 'mini-vc-wallet-secure-keystore';
const WALLET_KEY_USERNAME = 'mini-vc-wallet-key';

function createMockPublicKey(keyAlias: string): string {
  return `mock_public_key_${keyAlias}`;
}

function createMockSignature(payload: string, keyAlias: string): string {
  return `mock_signature_${payload}_${keyAlias}_${Date.now()}`;
}

async function saveWalletKeyAlias(keyAlias: string): Promise<void> {
  await Keychain.setGenericPassword(WALLET_KEY_USERNAME, keyAlias, {
    service: WALLET_KEYCHAIN_SERVICE,
  });
}

async function getStoredWalletKeyAlias(): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword({
    service: WALLET_KEYCHAIN_SERVICE,
  });

  if (!credentials) {
    return null;
  }

  return credentials.password;
}

export const SecureKeystoreService = {
  async generateKeyPair(): Promise<WalletKeyPairResult> {
    const existingKeyAlias = await getStoredWalletKeyAlias();

    const keyAlias = existingKeyAlias ?? `wallet-key-${Date.now()}`;

    await saveWalletKeyAlias(keyAlias);

    return {
      status: 'KEY_GENERATED',
      keyAlias,
      publicKey: createMockPublicKey(keyAlias),
      createdAt: new Date().toISOString(),
    };
  },

  async getWalletKeyAlias(): Promise<string | null> {
    return getStoredWalletKeyAlias();
  },

  async signPayload(payload: string): Promise<WalletSignatureResult> {
    const keyAlias = await getStoredWalletKeyAlias();

    if (!keyAlias) {
      throw new Error('Wallet key pair is not generated');
    }

    return {
      keyAlias,
      payload,
      signature: createMockSignature(payload, keyAlias),
      signedAt: new Date().toISOString(),
    };
  },

  async clearWalletKey(): Promise<void> {
    await Keychain.resetGenericPassword({
      service: WALLET_KEYCHAIN_SERVICE,
    });
  },
};