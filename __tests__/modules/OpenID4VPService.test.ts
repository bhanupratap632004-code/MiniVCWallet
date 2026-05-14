import {OpenID4VPService} from '../../src/modules/openid4vp/OpenID4VPService';
import {SecureKeystoreService} from '../../src/modules/secureKeystore/SecureKeystoreService';
import {sampleCredential} from '../../src/modules/credential/sampleCredential';

describe('OpenID4VPService', () => {
  it('parses verifier request', () => {
    const request =
      'openid4vp://authorize?client_id=demo-verifier-app&nonce=12345&presentation_definition=identity';

    const parsedRequest = OpenID4VPService.parseVerifierRequest(request);

    expect(parsedRequest.clientId).toBe('demo-verifier-app');
    expect(parsedRequest.nonce).toBe('12345');
    expect(parsedRequest.presentationDefinition).toBe('identity');
  });

  it('creates signed VP token', async () => {
    await SecureKeystoreService.generateKeyPair();

    const verifierRequest = OpenID4VPService.parseVerifierRequest(
      'openid4vp://authorize?client_id=demo-verifier-app&nonce=12345&presentation_definition=identity',
    );

    const vpToken = await OpenID4VPService.createSignedVPToken(
      sampleCredential,
      verifierRequest,
    );

    expect(vpToken.type).toBe('VerifiablePresentation');
    expect(vpToken.holder).toBe(sampleCredential.credentialSubject.id);
    expect(vpToken.verifier).toBe('demo-verifier-app');
    expect(vpToken.proof.signature).toContain('mock_signature_');
    expect(vpToken.proof.signature).toContain('demo-verifier-app');
    expect(vpToken.proof.signature).toContain(sampleCredential.id);
  });
});