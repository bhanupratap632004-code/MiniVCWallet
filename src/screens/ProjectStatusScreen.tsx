import React from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';

const modules = [
  {
    name: 'Secure Keystore',
    status: 'Completed',
    details: 'Mock key generation, key alias storage, and payload signing.',
  },
  {
    name: 'VCI Client',
    status: 'Completed',
    details: 'Mock credential download and wallet storage flow.',
  },
  {
    name: 'VC Verification',
    status: 'Completed',
    details: 'Mock verification status shown in credential details.',
  },
  {
    name: 'PixelPass',
    status: 'Completed',
    details: 'Credential encoded into QR payload using PixelPassService wrapper.',
  },
  {
    name: 'QR Decode',
    status: 'Completed',
    details: 'Mock scanner decodes PixelPass payload and displays credential.',
  },
  {
    name: 'OpenID4VP',
    status: 'Completed',
    details: 'Mock verifier request parsing and signed VP token generation.',
  },
  {
    name: 'Face Match',
    status: 'Completed',
    details: 'Mock face match gate before credential sharing.',
  },
  {
    name: 'Tuvali Offline Sharing',
    status: 'Completed',
    details: 'Mock BLE session, payload transfer, and receiver decode flow.',
  },
];

const demoFlow = [
  'Generate wallet key from Wallet Setup.',
  'Add sample credential to wallet.',
  'Open credential details and verify credential data.',
  'Perform face match before sharing.',
  'Generate PixelPass QR for credential sharing.',
  'Decode QR payload using mock scanner.',
  'Run OpenID4VP verifier request and create signed VP token.',
  'Simulate Tuvali offline sharing and receive credential.',
];

export default function ProjectStatusScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Project Status</Text>

      <Text style={styles.subtitle}>
        Inji-style wallet prototype module completion overview.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Implemented Modules</Text>

        {modules.map(module => (
          <View key={module.name} style={styles.card}>
            <Text style={styles.moduleName}>{module.name}</Text>
            <Text style={styles.status}>{module.status}</Text>
            <Text style={styles.details}>{module.details}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Demo Flow</Text>

        {demoFlow.map((item, index) => (
          <View key={item} style={styles.flowItem}>
            <Text style={styles.flowNumber}>{index + 1}</Text>
            <Text style={styles.flowText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>Integration Note</Text>
        <Text style={styles.noteText}>
          Current implementation uses clean mock wrappers for module-level
          understanding. These wrappers can later be replaced with real SDKs,
          APIs, BLE communication, camera scanner, and cryptographic signing
          without changing the overall app flow.
        </Text>
      </View>
    </ScrollView>
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
    lineHeight: 21,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0F172A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  status: {
    fontSize: 13,
    fontWeight: '700',
    color: '#047857',
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  flowItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  flowNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '700',
    marginRight: 12,
  },
  flowText: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    lineHeight: 20,
  },
  noteBox: {
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