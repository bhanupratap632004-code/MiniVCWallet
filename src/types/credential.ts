export type VerifiableCredential = {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  expirationDate: string;
  credentialSubject: {
    id: string;
    name: string;
    role: string;
    organization: string;
    employeeId: string;
  };
};