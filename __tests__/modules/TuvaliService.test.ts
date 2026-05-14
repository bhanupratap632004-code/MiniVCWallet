import {TuvaliService} from '../../src/modules/tuvali/TuvaliService';
import {sampleCredential} from '../../src/modules/credential/sampleCredential';

describe('TuvaliService', () => {
  it('creates offline session', () => {
    const session = TuvaliService.createOfflineSession();

    expect(session.sessionId).toContain('tuvali-session-');
    expect(session.status).toBe('CREATED');
  });

  it('prepares and receives credential payload', () => {
    const session = TuvaliService.createOfflineSession();

    const packet = TuvaliService.prepareCredentialPayload(
      session,
      sampleCredential,
    );

    const received = TuvaliService.receiveCredentialPayload(packet);

    expect(packet.channel).toBe('BLE_MOCK');
    expect(received.status).toBe('RECEIVED');
    expect(received.credential.id).toBe(sampleCredential.id);
  });
});