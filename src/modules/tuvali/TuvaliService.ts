import {PixelPassService} from '../pixelpass/PixelPassService';
import {VerifiableCredential} from '../../types/credential';

export type TuvaliSession = {
  sessionId: string;
  status: 'CREATED' | 'CONNECTED' | 'COMPLETED';
  createdAt: string;
};

export type TuvaliTransferPacket = {
  sessionId: string;
  channel: 'BLE_MOCK';
  payload: string;
  createdAt: string;
};

export type TuvaliReceivedCredential = {
  status: 'RECEIVED';
  credential: VerifiableCredential;
  receivedAt: string;
};

export const TuvaliService = {
  createOfflineSession(): TuvaliSession {
    return {
      sessionId: `tuvali-session-${Date.now()}`,
      status: 'CREATED',
      createdAt: new Date().toISOString(),
    };
  },

  connectSession(session: TuvaliSession): TuvaliSession {
    return {
      ...session,
      status: 'CONNECTED',
    };
  },

  prepareCredentialPayload(
    session: TuvaliSession,
    credential: VerifiableCredential,
  ): TuvaliTransferPacket {
    const encodedResult = PixelPassService.encodeCredentialForQR(credential);

    return {
      sessionId: session.sessionId,
      channel: 'BLE_MOCK',
      payload: encodedResult.qrPayload,
      createdAt: new Date().toISOString(),
    };
  },

  receiveCredentialPayload(packet: TuvaliTransferPacket): TuvaliReceivedCredential {
    const decodedResult = PixelPassService.decodeCredentialFromQR(packet.payload);

    const parsedPayload = PixelPassService.parseDecodedPayload(
      decodedResult.decodedPayload,
    );

    return {
      status: 'RECEIVED',
      credential: parsedPayload as VerifiableCredential,
      receivedAt: new Date().toISOString(),
    };
  },
};