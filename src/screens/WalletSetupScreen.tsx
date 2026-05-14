import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {SecureKeystoreService} from '../modules/secureKeystore/SecureKeystoreService';

export default function WalletSetupScreen() {
  const [keyAlias, setKeyAlias] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  useEffect(() => {
    loadExistingKey();
  }, []);

  const loadExistingKey = async () => {
    const existingKey = await SecureKeystoreService.getKeyAlias();

    if (existingKey) {
      setKeyAlias(existingKey);
    }
  };

  const handleGenerateKey = async () => {
    try {
      const result = await SecureKeystoreService.generateKeyPair();
      setKeyAlias(result.keyAlias);
      setSignature(null);
      Alert.alert('Success', 'Wallet key generated successfully');
    } catch {
      Alert.alert('Error', 'Failed to generate wallet key');
    }
  };

  const handleSignPayload = async () => {
    try {
      const result = await SecureKeystoreService.signPayload('test-payload');
      setSignature(result.signature);
      Alert.alert('Success', 'Payload signed successfully');
    } catch {
      Alert.alert('Error', 'Please generate wallet key first');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Setup</Text>

      <Text style={styles.subtitle}>
        Generate a wallet key and sign a sample payload.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGenerateKey}>
        <Text style={styles.buttonText}>Generate Wallet Key</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleSignPayload}>
        <Text style={styles.secondaryButtonText}>Sign Test Payload</Text>
      </TouchableOpacity>

      {keyAlias && (
        <View style={styles.card}>
          <Text style={styles.label}>Stored Key Alias</Text>
          <Text style={styles.value}>{keyAlias}</Text>
        </View>
      )}

      {signature && (
        <View style={styles.card}>
          <Text style={styles.label}>Mock Signature</Text>
          <Text style={styles.value}>{signature}</Text>
        </View>
      )}

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>Phase 1 Note</Text>
        <Text style={styles.noteText}>
          This is a mock Secure Keystore wrapper. In the next phase, the internal
          signing logic can be replaced with Android Keystore and iOS Keychain.
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
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#E2E8F0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#0F172A',
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 6,
  },
  value: {
    fontSize: 13,
    color: '#0F172A',
  },
  noteBox: {
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
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