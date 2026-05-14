import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import {FaceMatchService} from '../modules/faceMatch/FaceMatchService';

export default function FaceMatchScreen({navigation}: any) {
  const [status, setStatus] = useState(FaceMatchService.getFaceMatchStatus());

  const handleFaceMatch = async () => {
    const result = await FaceMatchService.performMockFaceMatch();
    setStatus(result);
    Alert.alert('Success', 'Face match verified successfully');
  };

  const handleContinueSharing = () => {
    const latestStatus = FaceMatchService.getFaceMatchStatus();

    if (!latestStatus?.matched) {
      Alert.alert('Face Match Required', 'Please verify face before sharing');
      return;
    }

    navigation.navigate('ShareCredential');
  };

  const handleClearStatus = () => {
    FaceMatchService.clearFaceMatchStatus();
    setStatus(null);
    Alert.alert('Cleared', 'Face match status cleared');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Face Match Verification</Text>

      <Text style={styles.subtitle}>
        Verify the wallet holder before allowing credential sharing.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Current Status</Text>

        {status ? (
          <>
            <Text style={styles.successText}>Verified</Text>

            <Text style={styles.label}>Confidence</Text>
            <Text style={styles.value}>{status.confidence}</Text>

            <Text style={styles.label}>Verified At</Text>
            <Text style={styles.value}>{status.verifiedAt}</Text>
          </>
        ) : (
          <Text style={styles.pendingText}>Not Verified</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFaceMatch}>
        <Text style={styles.buttonText}>Perform Mock Face Match</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleContinueSharing}>
        <Text style={styles.secondaryButtonText}>Continue to Share QR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dangerButton} onPress={handleClearStatus}>
        <Text style={styles.dangerButtonText}>Clear Face Match Status</Text>
      </TouchableOpacity>

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>Face Match Wrapper</Text>
        <Text style={styles.noteText}>
          This is a mock face match flow. Later, the internal logic can be
          replaced with a real camera-based face verification SDK or ML model.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    color: '#0F172A',
  },
  successText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#047857',
    marginBottom: 8,
  },
  pendingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B45309',
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 10,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#0F172A',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#E2E8F0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#0F172A',
    textAlign: 'center',
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  dangerButtonText: {
    color: '#991B1B',
    textAlign: 'center',
    fontWeight: '600',
  },
  noteBox: {
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 12,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D4ED8',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 13,
    color: '#1E3A8A',
    lineHeight: 19,
  },
});