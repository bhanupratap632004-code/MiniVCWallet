import {VerifiableCredential} from '../../types/credential';

export const sampleCredential: VerifiableCredential = {
  id: 'urn:uuid:intern-credential-001',
  type: ['VerifiableCredential', 'InternIDCredential'],
  issuer: 'Company Issuer',
  issuanceDate: '2026-05-14',
  expirationDate: '2026-12-31',
  credentialSubject: {
    id: 'did:example:intern001',
    name: 'Bhanu Pratap',
    role: 'React Native Intern',
    organization: 'Demo Company',
    employeeId: 'INT-001',
  },
};