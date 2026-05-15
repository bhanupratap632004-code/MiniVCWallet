const PixelPass = require('@injistack/pixelpass');

export type PixelPassEncodeResult = {
  qrPayload: string;
  originalPayload: string;
  encodedAt: string;
  isRealPixelPass: boolean;
};

export type PixelPassDecodeResult = {
  decodedPayload: string;
  decodedAt: string;
  isRealPixelPass: boolean;
};

export const PixelPassService = {
  /**
   * Encodes credential data using the real PixelPass package.
   * PixelPass compresses the JSON data and converts it into Base45 QR payload.
   */
  encodeCredentialForQR(credential: unknown): PixelPassEncodeResult {
    const originalPayload =
      typeof credential === 'string' ? credential : JSON.stringify(credential);

    const qrPayload = PixelPass.generateQRData(originalPayload);

    return {
      qrPayload,
      originalPayload,
      encodedAt: new Date().toISOString(),
      isRealPixelPass: true,
    };
  },

  /**
   * Decodes PixelPass QR payload back into original data.
   */
  decodeCredentialFromQR(qrPayload: string): PixelPassDecodeResult {
    const decodedPayload = PixelPass.decode(qrPayload);

    return {
      decodedPayload,
      decodedAt: new Date().toISOString(),
      isRealPixelPass: true,
    };
  },

  /**
   * Helper method to safely parse decoded QR payload into JSON.
   */
  parseDecodedPayload(decodedPayload: string) {
    try {
      return JSON.parse(decodedPayload);
    } catch {
      return decodedPayload;
    }
  },
};