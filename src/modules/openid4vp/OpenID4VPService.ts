import {SecureKeystoreService} from '../secureKeystore/SecureKeystoreService';
import {VerifiableCredential} from '../../types/credential';

export type OpenID4VPVerifierRequest = {
  clientId: string;
  nonce: string;
  presentationDefinition: string;
  redirectUri: string;
};

export type VerifiablePresentationToken = {
  type: 'VerifiablePresentation';
  holder: string;
  verifier: string;
  credentialId: string;
  nonce: string;
  proof: {
    type: string;
    created: string;
    keyAlias: string;
    signature: string;
  };
};

export const OpenID4VPService = {
  createMockVerifierRequest(): string {
    return (
      'openid4vp://authorize?' +
      'client_id=demo-verifier-app' +
      '&nonce=12345' +
      '&presentation_definition=identity' +
      '&redirect_uri=mini-vc-wallet://openid4vp/callback'
    );
  },

  parseVerifierRequest(requestUrl: string): OpenID4VPVerifierRequest {
    const url = new URL(requestUrl);

    return {
      clientId: url.searchParams.get('client_id') || '',
      nonce: url.searchParams.get('nonce') || '',
      presentationDefinition:
        url.searchParams.get('presentation_definition') || '',
      redirectUri: url.searchParams.get('redirect_uri') || '',
    };
  },

  async createSignedVPToken(
    credential: VerifiableCredential,
    verifierRequest: OpenID4VPVerifierRequest,
  ): Promise<VerifiablePresentationToken> {
    const proofPayload = {
      holder: credential.credentialSubject.id,
      nonce: verifierRequest.nonce,
      credentialId: credential.id,
      verifier: verifierRequest.clientId,
    };

    const signedResult = await SecureKeystoreService.signPayload(
      JSON.stringify(proofPayload),
    );

    return {
      type: 'VerifiablePresentation',
      holder: credential.credentialSubject.id,
      verifier: verifierRequest.clientId,
      credentialId: credential.id,
      nonce: verifierRequest.nonce,
      proof: {
        type: 'MockKeychainSignature2026',
        created: signedResult.signedAt,
        keyAlias: signedResult.keyAlias,
        signature: signedResult.signature,
      },
    };
  },
};