import {SecureKeystoreService} from '../secureKeystore/SecureKeystoreService';
import {VerifiableCredential} from '../../types/credential';

export type OpenID4VPVerifierRequest = {
  clientId: string;
  nonce: string;
  presentationDefinition: string;
  redirectUri?: string;
};

export type VerifiablePresentationToken = {
  type: 'VerifiablePresentation';
  holder: string;
  verifier: string;
  nonce: string;
  credentialId: string;
  issuedAt: string;
  proof: {
    type: string;
    created: string;
    keyAlias: string;
    signature: string;
  };
};

const createMockVerifierRequest = (): string => {
  const clientId = 'demo-verifier-app';
  const nonce = `nonce-${Date.now()}`;
  const presentationDefinition = 'identity';
  const redirectUri = 'mini-vc-wallet://openid4vp/callback';

  return (
    `openid4vp://authorize?` +
    `client_id=${encodeURIComponent(clientId)}` +
    `&nonce=${encodeURIComponent(nonce)}` +
    `&presentation_definition=${encodeURIComponent(presentationDefinition)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`
  );
};

const parseVerifierRequest = (
  requestUri: string,
): OpenID4VPVerifierRequest => {
  const queryString = requestUri.includes('?')
    ? requestUri.split('?')[1]
    : requestUri;

  const params = new URLSearchParams(queryString);

  return {
    clientId: params.get('client_id') || '',
    nonce: params.get('nonce') || '',
    presentationDefinition: params.get('presentation_definition') || '',
    redirectUri: params.get('redirect_uri') || undefined,
  };
};

const createSignedVPToken = async (
  credential: VerifiableCredential,
  verifierRequest: OpenID4VPVerifierRequest,
): Promise<VerifiablePresentationToken> => {
  const payload = {
    holder: credential.credentialSubject.id,
    nonce: verifierRequest.nonce,
    credentialId: credential.id,
    verifier: verifierRequest.clientId,
  };

  const signedPayload = await SecureKeystoreService.signPayload(
    JSON.stringify(payload),
  );

  return {
    type: 'VerifiablePresentation',
    holder: credential.credentialSubject.id,
    verifier: verifierRequest.clientId,
    nonce: verifierRequest.nonce,
    credentialId: credential.id,
    issuedAt: new Date().toISOString(),
    proof: {
      type: 'MockSignature2026',
      created: new Date().toISOString(),
      keyAlias: signedPayload.keyAlias,
      signature: signedPayload.signature,
    },
  };
};

export const OpenID4VPService = {
  createMockVerifierRequest,
  parseVerifierRequest,
  createSignedVPToken,
};