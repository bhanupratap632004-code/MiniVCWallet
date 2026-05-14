import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import WalletSetupScreen from '../screens/WalletSetupScreen';
import MyCredentialsScreen from '../screens/MyCredentialsScreen';
import CredentialDetailsScreen from '../screens/CredentialDetailsScreen';
import ShareCredentialScreen from '../screens/ShareCredentialScreen';
import ScanQRCodeScreen from '../screens/ScanQRCodeScreen';
import OpenID4VPScreen from '../screens/OpenID4VPScreen';
import FaceMatchScreen from '../screens/FaceMatchScreen';
import OfflineSharingScreen from '../screens/OfflineSharingScreen';
import ProjectStatusScreen from '../screens/ProjectStatusScreen';

export type RootStackParamList = {
  Home: undefined;
  WalletSetup: undefined;
  MyCredentials: undefined;
  CredentialDetails: undefined;
  ShareCredential: undefined;
  ScanQRCode: undefined;
  OpenID4VP: undefined;
  FaceMatch: undefined;
  OfflineSharing: undefined;
  ProjectStatus: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Mini VC Wallet'}}
        />

        <Stack.Screen
          name="WalletSetup"
          component={WalletSetupScreen}
          options={{title: 'Wallet Setup'}}
        />

        <Stack.Screen
          name="MyCredentials"
          component={MyCredentialsScreen}
          options={{title: 'My Credentials'}}
        />

        <Stack.Screen
          name="CredentialDetails"
          component={CredentialDetailsScreen}
          options={{title: 'Credential Details'}}
        />

        <Stack.Screen
          name="ShareCredential"
          component={ShareCredentialScreen}
          options={{title: 'Share Credential'}}
        />

        <Stack.Screen
          name="ScanQRCode"
          component={ScanQRCodeScreen}
          options={{title: 'Scan QR Code'}}
        />

        <Stack.Screen
          name="OpenID4VP"
          component={OpenID4VPScreen}
          options={{title: 'OpenID4VP'}}
        />

        <Stack.Screen
          name="FaceMatch"
          component={FaceMatchScreen}
          options={{title: 'Face Match'}}
        />

        <Stack.Screen
          name="OfflineSharing"
          component={OfflineSharingScreen}
          options={{title: 'Offline Sharing'}}
        />

        <Stack.Screen
          name="ProjectStatus"
          component={ProjectStatusScreen}
          options={{title: 'Project Status'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}