import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {getCredential} from '../storage/credentialStorage';

export default function CredentialDetailsScreen({navigation}: any) {
  const credential = getCredential();

  if (!credential) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Credential Details</Text>
        <Text style={styles.emptyText}>No credential found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Credential Details</Text>

      <TouchableOpacity
  style={styles.shareButton}
  onPress={() => navigation.navigate('FaceMatch')}>
  <Text style={styles.shareButtonText}>Verify Face & Share QR</Text>
</TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.label}>Credential Type</Text>
        <Text style={styles.value}>{credential.type.join(', ')}</Text>

        <Text style={styles.label}>Credential ID</Text>
        <Text style={styles.value}>{credential.id}</Text>

        <Text style={styles.label}>Issuer</Text>
        <Text style={styles.value}>{credential.issuer}</Text>

        <Text style={styles.label}>Issuance Date</Text>
        <Text style={styles.value}>{credential.issuanceDate}</Text>

        <Text style={styles.label}>Expiration Date</Text>
        <Text style={styles.value}>{credential.expirationDate}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Subject Details</Text>

        <Text style={styles.label}>DID</Text>
        <Text style={styles.value}>{credential.credentialSubject.id}</Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{credential.credentialSubject.name}</Text>

        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>{credential.credentialSubject.role}</Text>

        <Text style={styles.label}>Organization</Text>
        <Text style={styles.value}>
          {credential.credentialSubject.organization}
        </Text>

        <Text style={styles.label}>Employee ID</Text>
        <Text style={styles.value}>
          {credential.credentialSubject.employeeId}
        </Text>
      </View>

      <View style={styles.statusBox}>
        <Text style={styles.statusTitle}>Verification Status</Text>
        <Text style={styles.statusText}>
          Mock verification passed. Full VC signature verification will be added
          in a later phase.
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
    marginBottom: 16,
    color: '#0F172A',
  },
  shareButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  shareButtonText: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    color: '#0F172A',
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
  emptyText: {
    color: '#64748B',
    fontSize: 15,
  },
  statusBox: {
    backgroundColor: '#ECFDF5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 40,
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
});