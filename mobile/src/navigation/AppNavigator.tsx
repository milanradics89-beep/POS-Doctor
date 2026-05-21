/**
 * App Navigator
 * React Navigation stack setup - On-device diagnostics only
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DiagnosticsScreen from '../screens/DiagnosticsScreen';
import HistoryScreen from '../screens/HistoryScreen';

export type RootStackParamList = {
  Diagnostics: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Diagnostics"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0B0D10' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Diagnostics" component={DiagnosticsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
