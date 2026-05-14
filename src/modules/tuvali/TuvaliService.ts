import {VerifiableCredential} from '../../types/credential';
import {PixelPassService} from '../pixelpass/PixelPassService';

export type TuvaliOfflineSession = {
  sessionId: string;
  status: 'CREATED' | 'PAYLOAD_READY' | 'TRANSFERRED' | 'RECEIVED';
  createdAt: string;
};

export type TuvaliTransferPacket = {
  sessionId: string;
  channel: 'BLE_MOCK';
  payload: string;
  transferredAt: string;
};

export class TuvaliService {
  static createOfflineSession(): TuvaliOfflineSession {
    return {
      sessionId: `tuvali-session-${Date.now()}`,
      status: 'CREATED',
      createdAt: new Date().toISOString(),
    };
  }

  static prepareCredentialPayload(
    session: TuvaliOfflineSession,
    credential: VerifiableCredential,
  ): TuvaliTransferPacket {
    const payload = PixelPassService.encodeCredential(credential);

    return {
      sessionId: session.sessionId,
      channel: 'BLE_MOCK',
      payload,
      transferredAt: new Date().toISOString(),
    };
  }

  static receiveCredentialPayload(packet: TuvaliTransferPacket) {
    const credential = PixelPassService.decodeCredential(packet.payload);

    return {
      sessionId: packet.sessionId,
      status: 'RECEIVED' as const,
      receivedAt: new Date().toISOString(),
      credential,
    };
  }
}