/**
 * App Navigator
 * React Navigation stack setup
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DiscoveredDevice } from '../storage';

import ScanScreen from '../screens/ScanScreen';
import DeviceDetailScreen from '../screens/DeviceDetailScreen';
import DiagnosticsScreen from '../screens/DiagnosticsScreen';
import HistoryScreen from '../screens/HistoryScreen';

export type RootStackParamList = {
  Scan: undefined;
  DeviceDetail: { device: DiscoveredDevice };
  Diagnostics: { device: DiscoveredDevice; client: { ip: string; port: number } };
  History: { device: DiscoveredDevice };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0B0D10' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="DeviceDetail" component={DeviceDetailScreen} />
        <Stack.Screen name="Diagnostics" component={DiagnosticsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
