import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import {sampleCredential} from '../modules/credential/sampleCredential';
import {saveCredential, getCredential} from '../storage/credentialStorage';
import {VerifiableCredential} from '../types/credential';

export default function MyCredentialsScreen({navigation}: any) {
  const [credential, setCredential] = useState<VerifiableCredential | null>(
    getCredential(),
  );

  const handleAddCredential = () => {
    saveCredential(sampleCredential);
    setCredential(sampleCredential);
    Alert.alert('Success', 'Sample credential added to wallet');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Credentials</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddCredential}>
        <Text style={styles.buttonText}>Add Sample Intern Credential</Text>
      </TouchableOpacity>

      {credential ? (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CredentialDetails')}>
          <Text style={styles.cardTitle}>{credential.type[1]}</Text>

          <Text style={styles.cardText}>
            Name: {credential.credentialSubject.name}
          </Text>

          <Text style={styles.cardText}>
            Role: {credential.credentialSubject.role}
          </Text>

          <Text style={styles.cardText}>Issuer: {credential.issuer}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.emptyText}>No credentials added yet.</Text>
      )}
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
    marginBottom: 24,
    color: '#0F172A',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#0F172A',
  },
  cardText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 15,
  },
});