import React from 'react';
import {Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';

export default function HomeScreen({navigation}: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mini VC Wallet</Text>
      <Text style={styles.subtitle}>
        Cross-platform Verifiable Credential Wallet Prototype
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WalletSetup')}>
        <Text style={styles.buttonText}>Setup Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyCredentials')}>
        <Text style={styles.buttonText}>My Credentials</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('ScanQRCode')}>
        <Text style={styles.secondaryButtonText}>Scan QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('OpenID4VP')}>
        <Text style={styles.secondaryButtonText}>OpenID4VP Flow</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('FaceMatch')}>
        <Text style={styles.secondaryButtonText}>Face Match</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('OfflineSharing')}>
        <Text style={styles.secondaryButtonText}>Tuvali Offline Sharing</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => navigation.navigate('ProjectStatus')}>
        <Text style={styles.statusButtonText}>Project Status / Demo Flow</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  secondaryButton: {
    backgroundColor: '#E2E8F0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  statusButton: {
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#0F172A',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  statusButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});