import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  OpenID4VPService,
  OpenID4VPVerifierRequest,
  VerifiablePresentationToken,
} from '../modules/openid4vp/OpenID4VPService';

import {VerifiableCredential} from '../types/credential';

const sampleCredential: VerifiableCredential = {
  id: 'urn:uuid:intern-credential-001',
  type: ['VerifiableCredential', 'InternCredential'],
  issuer: 'did:example:issuer001',
  issuanceDate: '2026-05-15T00:00:00Z',
  expirationDate: '2027-05-15T00:00:00Z',
  credentialSubject: {
    id: 'did:example:intern001',
    employeeId: 'EMP-001',
    name: 'Demo Intern',
    role: 'React Native Intern',
    organization: 'Mini VC Wallet Demo',
  },
};

export default function OpenID4VPScreen() {
  const [request, setRequest] = useState<OpenID4VPVerifierRequest | null>(null);
  const [vpToken, setVpToken] = useState<VerifiablePresentationToken | null>(
    null,
  );

  const [requestUrl, setRequestUrl] = useState(
    'openid4vp://authorize?client_id=demo-verifier-app&nonce=12345&presentation_definition=identity&redirect_uri=mini-vc-wallet://openid4vp/callback',
  );

  const handleLoadVerifierRequest = () => {
    try {
      const parsedRequest = OpenID4VPService.parseVerifierRequest(
        'openid4vp://authorize?client_id=demo-verifier-app&nonce=12345&presentation_definition=identity&redirect_uri=mini-vc-wallet://openid4vp/callback',
      );

      setRequest(parsedRequest);
      setVpToken(null);

      Alert.alert('Success', 'Mock verifier request loaded successfully');
    } catch (error) {
      console.log('Load verifier request error:', error);
      Alert.alert('Error', 'Failed to load verifier request');
    }
  };

  const handleParsePastedRequest = () => {
    try {
      if (!requestUrl.trim()) {
        Alert.alert('Error', 'Please paste an OpenID4VP request URL first');
        return;
      }

      const parsedRequest = OpenID4VPService.parseVerifierRequest(
        requestUrl.trim(),
      );

      setRequest(parsedRequest);
      setVpToken(null);

      Alert.alert('Success', 'OpenID4VP request parsed successfully');
    } catch (error) {
      console.log('Parse pasted request error:', error);
      Alert.alert('Error', 'Failed to parse OpenID4VP request URL');
    }
  };

  const handleCreateSignedVPToken = async () => {
    try {
      if (!request) {
        Alert.alert('Error', 'Please load or parse a verifier request first');
        return;
      }

      const token = await OpenID4VPService.createSignedVPToken(
        sampleCredential,
        request,
      );

      setVpToken(token);

      Alert.alert('Success', 'Signed VP token created successfully');
    } catch (error) {
      console.log('Create signed VP token error:', error);
      Alert.alert('Error', 'Failed to create signed VP token');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>OpenID4VP Flow</Text>

      <Text style={styles.subtitle}>
        Simulate verifier request parsing and VP token signing.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleLoadVerifierRequest}>
        <Text style={styles.primaryButtonText}>Load Mock Verifier Request</Text>
      </TouchableOpacity>

      <View style={styles.inputCard}>
        <Text style={styles.sectionTitle}>Paste OpenID4VP Request URL</Text>

        <TextInput
          style={styles.input}
          value={requestUrl}
          onChangeText={setRequestUrl}
          multiline
          placeholder="Paste OpenID4VP request URL here"
          placeholderTextColor="#64748b"
        />

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleParsePastedRequest}>
          <Text style={styles.secondaryButtonText}>Parse Pasted Request</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.secondaryButton, !request && styles.disabledButton]}
        onPress={handleCreateSignedVPToken}
        disabled={!request}>
        <Text style={styles.secondaryButtonText}>Create Signed VP Token</Text>
      </TouchableOpacity>

      {request && (
        <View style={styles.resultCard}>
          <Text style={styles.sectionTitle}>Verifier Request</Text>

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
        <View style={styles.resultCard}>
          <Text style={styles.sectionTitle}>Signed VP Token</Text>

          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{vpToken.type}</Text>

          <Text style={styles.label}>Holder</Text>
          <Text style={styles.value}>{vpToken.holder}</Text>

          <Text style={styles.label}>Verifier</Text>
          <Text style={styles.value}>{vpToken.verifier}</Text>

          <Text style={styles.label}>Credential ID</Text>
          <Text style={styles.value}>{sampleCredential.id}</Text>

          <Text style={styles.label}>Employee ID</Text>
          <Text style={styles.value}>
            {sampleCredential.credentialSubject.employeeId}
          </Text>

          <Text style={styles.label}>Proof Type</Text>
          <Text style={styles.value}>{vpToken.proof.type}</Text>

          <Text style={styles.label}>Key Alias / Test Key ID</Text>
          <Text style={styles.value}>{vpToken.proof.keyAlias}</Text>

          <Text style={styles.label}>Signature / Test Signature</Text>
          <Text style={styles.value}>{vpToken.proof.signature}</Text>
        </View>
      )}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>OpenID4VP Wrapper</Text>

        <Text style={styles.infoText}>
          This screen demonstrates OpenID4VP request parsing and VP token
          signing. The VP token is signed using the wallet key alias stored in
          native secure storage.
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
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  secondaryButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.5,
  },
  inputCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    color: '#111827',
    fontSize: 14,
    textAlignVertical: 'top',
    marginTop: 10,
    marginBottom: 14,
    backgroundColor: '#f8fafc',
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
    marginBottom: 14,
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
  infoCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
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