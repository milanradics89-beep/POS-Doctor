import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatePanel } from '../src/ui/components';
import { theme } from '../src/ui/theme';

type State = { hasError: boolean };

class AppErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[USEIT] Unhandled application error', error);
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.safe}>
          <View style={styles.container}>
            <Text style={styles.kicker}>USEIT / SYSTEM</Text>
            <Text style={styles.title}>A small interruption.</Text>
            <StatePanel
              kind="error"
              title="Something didn't go to plan"
              description="USEIT hit an unexpected application error. Your next step is to try the screen again."
              actionLabel="TRY AGAIN"
              onAction={this.reset}
            />
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

export default function Layout() {
  return (
    <AppErrorBoundary>
      <Stack screenOptions={{ headerShown: false }} />
    </AppErrorBoundary>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.canvas },
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  kicker: { fontSize: 9, fontWeight: '900', letterSpacing: 1.8, color: theme.colors.muted, marginBottom: 18 },
  title: { marginBottom: 20, fontSize: 34, lineHeight: 38, fontWeight: '800', letterSpacing: -1.4, color: theme.colors.ink },
});
