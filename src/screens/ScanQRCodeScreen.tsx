import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import {PixelPassService} from '../modules/pixelpass/PixelPassService';
import {VerifiableCredential} from '../types/credential';
import {getCredential} from '../storage/credentialStorage';

export default function ScanQRCodeScreen() {
  const [decodedCredential, setDecodedCredential] =
    useState<VerifiableCredential | null>(null);

  const handleMockScanStoredCredential = () => {
    const credential = getCredential();

    if (!credential) {
      Alert.alert('Error', 'No stored credential found to decode');
      return;
    }

    try {
      const qrPayload = PixelPassService.encodeCredential(credential);
      const decoded = PixelPassService.decodeCredential(qrPayload);

      setDecodedCredential(decoded);
      Alert.alert('Success', 'Credential QR decoded successfully');
    } catch {
      Alert.alert('Invalid QR', 'Unable to decode credential QR payload');
    }
  };

  const handleScanAgain = () => {
    setDecodedCredential(null);
  };

  if (decodedCredential) {
    return (
      <ScrollView style={styles.resultContainer}>
        <Text style={styles.title}>Decoded Credential</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Credential Type</Text>
          <Text style={styles.value}>{decodedCredential.type.join(', ')}</Text>

          <Text style={styles.label}>Holder</Text>
          <Text style={styles.value}>
            {decodedCredential.credentialSubject.name}
          </Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>
            {decodedCredential.credentialSubject.role}
          </Text>

          <Text style={styles.label}>Issuer</Text>
          <Text style={styles.value}>{decodedCredential.issuer}</Text>

          <Text style={styles.label}>Employee ID</Text>
          <Text style={styles.value}>
            {decodedCredential.credentialSubject.employeeId}
          </Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusTitle}>Decode Status</Text>
          <Text style={styles.statusText}>
            Mock QR payload decoded successfully using PixelPassService wrapper.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleScanAgain}>
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Scan QR Code</Text>

      <Text style={styles.text}>
        Live camera scanning will be connected after matching the correct Vision
        Camera scanner API version. For now, this screen verifies the QR decode
        flow using the stored credential.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleMockScanStoredCredential}>
        <Text style={styles.buttonText}>Mock Scan Stored Credential QR</Text>
      </TouchableOpacity>

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>Step 8 Status</Text>
        <Text style={styles.noteText}>
          This confirms the QR decoding pipeline: credential to PixelPass payload
          to decoded credential.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  resultContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0F172A',
  },
  text: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 20,
    lineHeight: 21,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
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
  statusBox: {
    backgroundColor: '#ECFDF5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#047857',
    marginBottom: 6,
  },
  statusText: {
    fontSize: 13,
    color: '#065F46',
    lineHeight: 19,
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