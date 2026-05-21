/**
 * POS Doctor - React Native App Root
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { LanguageProvider } from './src/i18n/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <StatusBar style="light" backgroundColor="#10141A" />
      <AppNavigator />
    </LanguageProvider>
  );
}
