import {createMMKV} from 'react-native-mmkv';

const faceMatchStorage = createMMKV({
  id: 'face-match-storage',
});

export class FaceMatchService {
  static async performMockFaceMatch() {
    const result = {
      matched: true,
      confidence: 0.94,
      verifiedAt: new Date().toISOString(),
    };

    faceMatchStorage.set('faceMatchVerified', JSON.stringify(result));

    return result;
  }

  static getFaceMatchStatus() {
    const data = faceMatchStorage.getString('faceMatchVerified');

    if (!data) {
      return null;
    }

    return JSON.parse(data) as {
      matched: boolean;
      confidence: number;
      verifiedAt: string;
    };
  }

  static clearFaceMatchStatus() {
    faceMatchStorage.remove('faceMatchVerified');
  }
}