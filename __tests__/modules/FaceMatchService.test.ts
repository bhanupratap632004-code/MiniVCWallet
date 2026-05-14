import {FaceMatchService} from '../../src/modules/faceMatch/FaceMatchService';

describe('FaceMatchService', () => {
  it('performs mock face match and stores status', async () => {
    const result = await FaceMatchService.performMockFaceMatch();

    expect(result.matched).toBe(true);
    expect(result.confidence).toBeGreaterThan(0.9);

    const storedStatus = FaceMatchService.getFaceMatchStatus();

    expect(storedStatus?.matched).toBe(true);
  });

  it('clears face match status', () => {
    FaceMatchService.clearFaceMatchStatus();

    const status = FaceMatchService.getFaceMatchStatus();

    expect(status).toBeNull();
  });
});