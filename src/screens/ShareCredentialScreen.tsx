import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import {getCredential} from '../storage/credentialStorage';
import {PixelPassService} from '../modules/pixelpass/PixelPassService';
import {FaceMatchService} from '../modules/faceMatch/FaceMatchService';

export default function ShareCredentialScreen({navigation}: any) {
  const credential = getCredential();
  const faceStatus = FaceMatchService.getFaceMatchStatus();

  if (!credential) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Share Credential</Text>
        <Text style={styles.emptyText}>No credential found.</Text>
      </View>
    );
  }

  if (!faceStatus?.matched) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Face Match Required</Text>

        <Text style={styles.subtitle}>
          Please verify face before sharing this credential.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FaceMatch')}>
          <Text style={styles.buttonText}>Verify Face</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const qrPayload = PixelPassService.encodeCredential(credential);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Share Credential</Text>

      <Text style={styles.subtitle}>
        Face match verified. This QR code contains the encoded credential
        payload.
      </Text>

      <View style={styles.qrCard}>
        <QRCode value={qrPayload} size={230} />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Credential Type</Text>
        <Text style={styles.value}>{credential.type[1]}</Text>

        <Text style={styles.label}>Holder</Text>
        <Text style={styles.value}>{credential.credentialSubject.name}</Text>

        <Text style={styles.label}>Issuer</Text>
        <Text style={styles.value}>{credential.issuer}</Text>

        <Text style={styles.label}>Face Match Confidence</Text>
        <Text style={styles.value}>{faceStatus.confidence}</Text>
      </View>

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>Secure Sharing Flow</Text>
        <Text style={styles.noteText}>
          Credential sharing is allowed only after face match verification. This
          simulates holder authentication before sharing.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F172A',
  },
  subtitle: {
    alignSelf: 'flex-start',
    fontSize: 15,
    color: '#475569',
    marginBottom: 24,
    lineHeight: 21,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    marginBottom: 24,
  },
  infoCard: {
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#0F172A',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 15,
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  noteBox: {
    alignSelf: 'stretch',
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 40,
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