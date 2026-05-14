# Mini VC Wallet

Mini VC Wallet is a cross-platform mobile application prototype inspired by the basic working flow of a digital credential wallet such as INJI Wallet. The application is built using React Native and runs successfully on both Android and iOS.

This project was created to understand how a Verifiable Credential wallet can be structured at a basic level, including wallet setup, credential storage, QR-based credential sharing, verifier request handling, face match verification, offline sharing, and unit testing of core wallet modules.

---

## Project Objective

The main objective of this project is to build a small demo version of a digital credential wallet and understand the internal flow of important wallet modules.

The project currently works as a mock/demo implementation. The core logic is simulated so that the working flow of each module can be understood clearly. In the future, these mock implementations can be replaced with real APIs, SDKs, cryptographic signing, real camera scanning, and production-level wallet integrations.

---

## Current Project Status

The application is currently working successfully on:

- Android Emulator
- iOS Simulator

The project includes a complete mock flow for a Verifiable Credential wallet and unit tests for the core modules.

Current test result:

```text
Test Suites: 5 passed, 5 total
Tests: 9 passed, 9 total

Features Implemented

* Cross-platform mobile application using React Native
* Wallet setup flow
* Mock credential download and storage
* My Credentials screen
* Credential details screen
* PixelPass QR payload generation
* QR code display for credential sharing
* Mock QR decoding flow
* OpenID4VP verifier request parsing
* Mock signed Verifiable Presentation token generation
* Face Match verification flow before credential sharing
* Tuvali offline sharing simulation
* Project Status / Demo Flow screen
* Unit tests for core wallet modules

Core Modules

1. Secure Keystore Service

The Secure Keystore Service simulates secure wallet key generation and signing operations. In a real wallet, this module would be responsible for storing private keys securely and signing credential-related payloads.

Current implementation:

* Mock wallet key generation
* Mock key alias creation
* Mock payload signing

Future real implementation may include:

* Native secure storage
* Android Keystore
* iOS Keychain
* Hardware-backed key storage
* Real cryptographic signing

2. PixelPass Service

The PixelPass Service is used to encode credential information into a QR-compatible payload. This helps simulate how credential data can be prepared for QR-based sharing.

Current implementation:

* Converts credential data into a mock PixelPass payload
* Generates QR-compatible data for sharing

Future real implementation may include:

* Real PixelPass encoding
* Data compression
* Secure credential packaging
* Production-level QR payload generation

3. OpenID4VP Service

The OpenID4VP Service simulates verifier request handling and Verifiable Presentation token generation.

Current implementation:

* Mock verifier request creation
* Verifier request parsing
* Mock signed Verifiable Presentation token generation

Future real implementation may include:

* Real OpenID4VP request handling
* Real verifier QR/deep link scanning
* DID-based holder identification
* Real Verifiable Presentation signing
* Verifier response submission

4. Face Match Service

The Face Match Service simulates a verification step before credential sharing. This adds a basic security gate before allowing the user to share credentials.

Current implementation:

* Mock face match verification
* Mock confidence score
* Verification status storage

Future real implementation may include:

* Real camera-based face capture
* Face verification SDK
* ML-based face matching
* Liveness detection
* Biometric verification flow

5. Tuvali Service

The Tuvali Service simulates offline credential sharing. It represents a basic offline sharing flow where credential payloads can be transferred without depending completely on an online network.

Current implementation:

* Mock offline sharing session
* Mock payload transfer
* Mock receiver flow

Future real implementation may include:

* Real Tuvali SDK integration
* BLE-based offline sharing
* Secure offline session establishment
* Encrypted payload transfer
* Receiver-side credential validation

Application Screens

The application includes the following screens:

* Home Screen
* Wallet Setup Screen
* My Credentials Screen
* Credential Details Screen
* Share Credential Screen
* Scan QR Code Screen
* OpenID4VP Screen
* Face Match Screen
* Offline Sharing Screen
* Project Status Screen

Unit Testing

Unit tests have been added for the core wallet modules.

Test files included:
__tests__/modules/SecureKeystoreService.test.ts
__tests__/modules/PixelPassService.test.ts
__tests__/modules/OpenID4VPService.test.ts
__tests__/modules/FaceMatchService.test.ts
__tests__/modules/TuvaliService.test.ts

Run tests using:
npm test
Test Suites: 5 passed, 5 total
Tests: 9 passed, 9 total

Tech Stack

* React Native
* TypeScript
* React Navigation
* React Native MMKV
* React Native QR Code SVG
* Jest
* Android Emulator
* iOS Simulator

MiniVCWallet
├── __tests__
│   └── modules
│       ├── SecureKeystoreService.test.ts
│       ├── PixelPassService.test.ts
│       ├── OpenID4VPService.test.ts
│       ├── FaceMatchService.test.ts
│       └── TuvaliService.test.ts
│
├── src
│   ├── modules
│   │   ├── credential
│   │   ├── faceMatch
│   │   ├── openid4vp
│   │   ├── pixelpass
│   │   ├── secureKeystore
│   │   └── tuvali
│   │
│   ├── navigation
│   │   └── AppNavigator.tsx
│   │
│   ├── screens
│   │   ├── HomeScreen.tsx
│   │   ├── WalletSetupScreen.tsx
│   │   ├── MyCredentialsScreen.tsx
│   │   ├── CredentialDetailsScreen.tsx
│   │   ├── ShareCredentialScreen.tsx
│   │   ├── ScanQRCodeScreen.tsx
│   │   ├── OpenID4VPScreen.tsx
│   │   ├── FaceMatchScreen.tsx
│   │   ├── OfflineSharingScreen.tsx
│   │   └── ProjectStatusScreen.tsx
│   │
│   ├── storage
│   └── types
│
├── android
├── ios
├── App.tsx
├── package.json
├── jest.config.js
├── jest.setup.js
└── README.md

How to Run the Project
1. Clone the Repository
   git clone https://github.com/bhanupratap632004-code/MiniVCWallet.git
2. Go to Project Folder
   cd MiniVCWallet
3. Install Dependencies
   npm install
4. Start Metro Server
   npm start
Run on Android

Open a new terminal window and run:
npm run android
Run on iOS

For iOS, install pods first:
cd ios

pod install

cd ..
Then run:
npm run ios

How to Run Tests

Run the following command from the project root:
npm test

Demo Flow

The current mock demo flow is:
Wallet Setup
      ↓
Mock Credential Storage
      ↓
My Credentials
      ↓
Credential Details
      ↓
Share Credential / QR Generation
      ↓
QR Decode / OpenID4VP / Face Match / Offline Sharing
      ↓
Project Status

Current Limitations

This project is currently a mock prototype and does not yet include:

* Real issuer API integration
* Real credential download from server
* Real cryptographic key generation
* Real cryptographic signing
* Real OpenID4VP verifier communication
* Real camera-based QR scanning
* Real face verification SDK
* Real Tuvali SDK integration
* Production-level security implementation

Future Scope

The current mock modules can later be replaced with real implementations such as:

* Real INJI Wallet APIs or SDKs
* Real credential issuer API
* Real secure key storage
* Real cryptographic signing
* Real QR scanner using camera
* Real OpenID4VP verifier request handling
* Real face verification SDK or ML model
* Real Tuvali offline sharing integration
* Encrypted credential storage
* Production-level error handling
* Improved UI and accessibility

Learning Outcome

Through this project, I gained practical knowledge of how a digital credential wallet can be structured. I learned how different modules such as secure storage, credential handling, QR sharing, OpenID4VP, face match verification, offline sharing, navigation, and unit testing can work together in a mobile wallet application.

This project also helped me become more confident with React Native cross-platform development, TypeScript-based module structuring, Android and iOS testing, and writing unit tests for core application logic.

Repository

GitHub Repository:
https://github.com/bhanupratap632004-code/MiniVCWallet

Author

Bhanu Pratap Singh

