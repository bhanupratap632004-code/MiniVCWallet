import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {sampleCredential} from '../modules/credential/sampleCredential';
import {FaceMatchService} from '../modules/faceMatch/FaceMatchService';
import {PixelPassService} from '../modules/pixelpass/PixelPassService';

export default function ShareCredentialScreen() {
  const faceStatus = FaceMatchService.getFaceMatchStatus();

  const handleContinueToShareQR = () => {
    try {
      const result = PixelPassService.encodeCredentialForQR(sampleCredential);

      Alert.alert(
        'QR Payload Created',
        `Credential QR payload created successfully.\n\nPayload Preview:\n${result.qrPayload.substring(
          0,
          80,
        )}...`,
      );
    } catch (error) {
      console.log('Share QR error:', error);
      Alert.alert('Error', 'Unable to create QR payload for sharing');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Share Credential</Text>

      <Text style={styles.subtitle}>
        Review your credential and continue to generate a QR payload for offline
        or verifier-based sharing.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Credential Details</Text>

        <Text style={styles.label}>Credential ID</Text>
        <Text style={styles.value}>{sampleCredential.id}</Text>

        <Text style={styles.label}>Holder DID</Text>
        <Text style={styles.value}>
          {sampleCredential.credentialSubject.id}
        </Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>
          {sampleCredential.credentialSubject.name}
        </Text>

        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>
          {sampleCredential.credentialSubject.role}
        </Text>

        <Text style={styles.label}>Organization</Text>
        <Text style={styles.value}>
          {sampleCredential.credentialSubject.organization}
        </Text>

        <Text style={styles.label}>Employee ID</Text>
        <Text style={styles.value}>
          {sampleCredential.credentialSubject.employeeId}
        </Text>

        <Text style={styles.label}>Issuer</Text>
        <Text style={styles.value}>{sampleCredential.issuer}</Text>

        <Text style={styles.label}>Issuance Date</Text>
        <Text style={styles.value}>{sampleCredential.issuanceDate}</Text>

        <Text style={styles.label}>Expiration Date</Text>
        <Text style={styles.value}>{sampleCredential.expirationDate}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Face Match Status</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>
          {faceStatus?.matched ? 'MATCHED' : 'NOT VERIFIED'}
        </Text>

        <Text style={styles.label}>Confidence</Text>
        <Text style={styles.value}>
          {faceStatus ? `${Math.round(faceStatus.confidence * 100)}%` : 'N/A'}
        </Text>

        <Text style={styles.label}>Verified At</Text>
        <Text style={styles.value}>{faceStatus?.verifiedAt ?? 'N/A'}</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleContinueToShareQR}>
        <Text style={styles.primaryButtonText}>Continue to Share QR</Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Step 8 Status</Text>

        <Text style={styles.infoText}>
          This step confirms the credential sharing pipeline: credential to
          PixelPass payload to QR-ready encoded data.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginTop: 10,
  },
  value: {
    fontSize: 14,
    color: '#111827',
    marginTop: 4,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1d4ed8',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#1e3a8a',
  },
});