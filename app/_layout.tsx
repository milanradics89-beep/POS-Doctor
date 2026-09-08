import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

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
            <Text style={styles.kicker}>USEIT</Text>
            <Text style={styles.title}>Something went wrong.</Text>
            <Text style={styles.body}>
              USEIT hit an unexpected application error. You can safely try the screen again.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Try USEIT again"
              onPress={this.reset}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>TRY AGAIN</Text>
            </Pressable>
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
  safe: { flex: 1, backgroundColor: '#F7F7F2' },
  container: { flex: 1, justifyContent: 'center', padding: 28 },
  kicker: { fontSize: 12, fontWeight: '900', letterSpacing: 2, color: '#777' },
  title: { marginTop: 12, fontSize: 38, lineHeight: 40, fontWeight: '800', letterSpacing: -1.5, color: '#111' },
  body: { marginTop: 16, fontSize: 16, lineHeight: 24, color: '#666' },
  button: { marginTop: 28, borderRadius: 18, padding: 18, alignItems: 'center', backgroundColor: '#111' },
  buttonPressed: { opacity: 0.75 },
  buttonText: { color: '#fff', fontWeight: '900', letterSpacing: 0.5 },
});
