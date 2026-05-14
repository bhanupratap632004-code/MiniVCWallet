import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  OpenID4VPService,
  OpenID4VPVerifierRequest,
  VerifiablePresentationToken,
} from '../modules/openid4vp/OpenID4VPService';

import {sampleCredential} from '../modules/credential/sampleCredential';

export default function OpenID4VPScreen() {
  const [request, setRequest] = useState<OpenID4VPVerifierRequest | null>(null);
  const [vpToken, setVpToken] = useState<VerifiablePresentationToken | null>(
    null,
  );

  const handleLoadVerifierRequest = () => {
    try {
      const mockRequest = OpenID4VPService.createMockVerifierRequest();

      const parsedRequest =
        OpenID4VPService.parseVerifierRequest(mockRequest);

      setRequest(parsedRequest);
      setVpToken(null);

      Alert.alert('Success', 'Mock verifier request loaded successfully');
    } catch {
      Alert.alert('Error', 'Failed to load verifier request');
    }
  };

  const handleCreateSignedVPToken = async () => {
    try {
      if (!request) {
        Alert.alert('Error', 'Please load verifier request first');
        return;
      }

      const token = await OpenID4VPService.createSignedVPToken(
        sampleCredential,
        request,
      );

      setVpToken(token);

      Alert.alert('Success', 'Signed VP token created successfully');
    } catch {
      Alert.alert('Error', 'Failed to create signed VP token');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>OpenID4VP Flow</Text>

      <Text style={styles.subtitle}>
        Simulate verifier request parsing and VP token signing.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLoadVerifierRequest}>
        <Text style={styles.buttonText}>Load Mock Verifier Request</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleCreateSignedVPToken}>
        <Text style={styles.secondaryButtonText}>Create Signed VP Token</Text>
      </TouchableOpacity>

      {request && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Parsed Verifier Request</Text>

          <Text style={styles.label}>Client ID</Text>
          <Text style={styles.value}>{request.clientId}</Text>

          <Text style={styles.label}>Nonce</Text>
          <Text style={styles.value}>{request.nonce}</Text>

          <Text style={styles.label}>Presentation Definition</Text>
          <Text style={styles.value}>{request.presentationDefinition}</Text>

          <Text style={styles.label}>Redirect URI</Text>
          <Text style={styles.value}>{request.redirectUri}</Text>
        </View>
      )}

      {vpToken && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Signed VP Token</Text>

          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{vpToken.type}</Text>

          <Text style={styles.label}>Holder</Text>
          <Text style={styles.value}>{vpToken.holder}</Text>

          <Text style={styles.label}>Verifier</Text>
          <Text style={styles.value}>{vpToken.verifier}</Text>

          <Text style={styles.label}>Credential ID</Text>
          <Text style={styles.value}>{vpToken.credentialId}</Text>

          <Text style={styles.label}>Signature</Text>
          <Text style={styles.value}>{vpToken.proof.signature}</Text>
        </View>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>OpenID4VP Wrapper</Text>
        <Text style={styles.infoText}>
          This screen simulates OpenID4VP request handling. Later, the mock
          verifier request can be replaced with a real verifier QR or deep link.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 28,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: '#111827',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 10,
  },
  value: {
    fontSize: 14,
    color: '#111827',
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    padding: 18,
    borderRadius: 16,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D4ED8',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#1E3A8A',
    lineHeight: 23,
  },
});