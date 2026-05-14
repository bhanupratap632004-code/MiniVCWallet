import {SecureKeystoreService} from '../../src/modules/secureKeystore/SecureKeystoreService';

describe('SecureKeystoreService', () => {
  it('generates wallet key alias', async () => {
    const result = await SecureKeystoreService.generateKeyPair();

    expect(result.status).toBe('KEY_GENERATED');
    expect(result.keyAlias).toContain('wallet-key-');
  });

  it('signs payload using generated wallet key alias', async () => {
    const keyResult = await SecureKeystoreService.generateKeyPair();

    const signedResult = await SecureKeystoreService.signPayload('demo-payload');

    expect(signedResult.keyAlias).toBe(keyResult.keyAlias);
    expect(signedResult.signature).toContain('mock_signature_');
    expect(signedResult.signature).toContain('demo-payload');
    expect(signedResult.signature).toContain(keyResult.keyAlias);
  });
});