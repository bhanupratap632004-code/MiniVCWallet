import {PixelPassService} from '../../src/modules/pixelpass/PixelPassService';
import {sampleCredential} from '../../src/modules/credential/sampleCredential';

describe('PixelPassService', () => {
  it('encodes and decodes credential successfully', () => {
    const encoded = PixelPassService.encodeCredential(sampleCredential);
    const decoded = PixelPassService.decodeCredential(encoded);

    expect(decoded.id).toBe(sampleCredential.id);
    expect(decoded.credentialSubject.name).toBe(
      sampleCredential.credentialSubject.name,
    );
    expect(decoded.issuer).toBe(sampleCredential.issuer);
  });
});