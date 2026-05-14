import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import {
  TuvaliOfflineSession,
  TuvaliService,
  TuvaliTransferPacket,
} from '../modules/tuvali/TuvaliService';
import {VerifiableCredential} from '../types/credential';
import {getCredential} from '../storage/credentialStorage';

type ReceivedCredentialResult = {
  sessionId: string;
  status: 'RECEIVED';
  receivedAt: string;
  credential: VerifiableCredential;
};

export default function OfflineSharingScreen() {
  const [session, setSession] = useState<TuvaliOfflineSession | null>(null);
  const [packet, setPacket] = useState<TuvaliTransferPacket | null>(null);
  const [receivedResult, setReceivedResult] =
    useState<ReceivedCredentialResult | null>(null);

  const handleCreateSession = () => {
    const newSession = TuvaliService.createOfflineSession();

    setSession(newSession);
    setPacket(null);
    setReceivedResult(null);

    Alert.alert('Success', 'Offline sharing session created');
  };

  const handlePreparePayload = () => {
    if (!session) {
      Alert.alert('Error', 'Please create offline session first');
      return;
    }

    const credential = getCredential();

    if (!credential) {
      Alert.alert('Error', 'Please add a credential first');
      return;
    }

    const transferPacket = TuvaliService.prepareCredentialPayload(
      session,
      credential,
    );

    setPacket(transferPacket);
    setReceivedResult(null);

    Alert.alert('Success', 'Credential payload prepared for offline transfer');
  };

  const handleSimulateTransfer = () => {
    if (!packet) {
      Alert.alert('Error', 'Please prepare payload first');
      return;
    }

    const result = TuvaliService.receiveCredentialPayload(packet);
    setReceivedResult(result);

    Alert.alert('Success', 'Offline credential transfer simulated');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tuvali Offline Sharing</Text>

      <Text style={styles.subtitle}>
        Simulate offline credential sharing using a Tuvali-style BLE transfer
        wrapper.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleCreateSession}>
        <Text style={styles.buttonText}>Create Offline Session</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handlePreparePayload}>
        <Text style={styles.secondaryButtonText}>Prepare Credential Payload</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleSimulateTransfer}>
        <Text style={styles.secondaryButtonText}>Simulate BLE Transfer</Text>
      </TouchableOpacity>

      {session && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Offline Session</Text>

          <Text style={styles.label}>Session ID</Text>
          <Text style={styles.value}>{session.sessionId}</Text>

          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{session.status}</Text>

          <Text style={styles.label}>Created At</Text>
          <Text style={styles.value}>{session.createdAt}</Text>
        </View>
      )}

      {packet && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Transfer Packet</Text>

          <Text style={styles.label}>Session ID</Text>
          <Text style={styles.value}>{packet.sessionId}</Text>

          <Text style={styles.label}>Channel</Text>
          <Text style={styles.value}>{packet.channel}</Text>

          <Text style={styles.label}>Transferred At</Text>
          <Text style={styles.value}>{packet.transferredAt}</Text>

          <Text style={styles.label}>Payload Preview</Text>
          <Text style={styles.value} numberOfLines={4}>
            {packet.payload}
          </Text>
        </View>
      )}

      {receivedResult && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Received Credential</Text>

          <Text style={styles.label}>Receive Status</Text>
          <Text style={styles.value}>{receivedResult.status}</Text>

          <Text style={styles.label}>Received At</Text>
          <Text style={styles.value}>{receivedResult.receivedAt}</Text>

          <Text style={styles.label}>Holder</Text>
          <Text style={styles.value}>
            {receivedResult.credential.credentialSubject.name}
          </Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>
            {receivedResult.credential.credentialSubject.role}
          </Text>

          <Text style={styles.label}>Issuer</Text>
          <Text style={styles.value}>{receivedResult.credential.issuer}</Text>
        </View>
      )}

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>Tuvali Wrapper</Text>
        <Text style={styles.noteText}>
          This screen simulates Tuvali-style offline sharing. Later, the BLE mock
          channel can be replaced with real BLE communication.
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
    marginBottom: 12,
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