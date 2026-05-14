import {VerifiableCredential} from '../../types/credential';

export class PixelPassService {
  static encodeCredential(credential: VerifiableCredential) {
    const payload = {
      format: 'pixelpass-mock',
      version: '1.0',
      type: 'VerifiableCredential',
      data: credential,
    };

    return JSON.stringify(payload);
  }

  static decodeCredential(qrPayload: string) {
    const decodedPayload = JSON.parse(qrPayload);

    return decodedPayload.data as VerifiableCredential;
  }
}