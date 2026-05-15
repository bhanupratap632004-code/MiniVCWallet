import {PixelPassService} from '../../src/modules/pixelpass/PixelPassService';

describe('PixelPassService', () => {
  const sampleCredential = {
    id: 'urn:uuid:intern-credential-001',
    type: ['VerifiableCredential', 'InternCredential'],
    issuer: 'did:example:issuer001',
    credentialSubject: {
      id: 'did:example:intern001',
      name: 'Demo Intern',
      role: 'React Native Intern',
    },
  };

  it('encodes credential into real PixelPass QR payload', () => {
    const result = PixelPassService.encodeCredentialForQR(sampleCredential);

    expect(result.qrPayload).toBeTruthy();
    expect(result.originalPayload).toContain('Demo Intern');
    expect(result.isRealPixelPass).toBe(true);
  });

  it('decodes real PixelPass QR payload back to credential data', () => {
    const encoded = PixelPassService.encodeCredentialForQR(sampleCredential);
    const decoded = PixelPassService.decodeCredentialFromQR(encoded.qrPayload);

    expect(decoded.decodedPayload).toBeTruthy();
    expect(decoded.decodedPayload).toContain('Demo Intern');
    expect(decoded.isRealPixelPass).toBe(true);
  });

  it('parses decoded PixelPass payload into JSON', () => {
    const encoded = PixelPassService.encodeCredentialForQR(sampleCredential);
    const decoded = PixelPassService.decodeCredentialFromQR(encoded.qrPayload);

    const parsed = PixelPassService.parseDecodedPayload(decoded.decodedPayload);

    expect(parsed.credentialSubject.name).toBe('Demo Intern');
    expect(parsed.credentialSubject.role).toBe('React Native Intern');
  });
});