import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BrandMark, FadeIn, SectionHeader } from '../src/ui/components';
import { theme } from '../src/ui/theme';

type PreferenceRowProps = { title: string; description: string; value: boolean; onValueChange: (value: boolean) => void };
function PreferenceRow({ title, description, value, onValueChange }: PreferenceRowProps) {
  return (
    <View style={styles.preferenceRow}>
      <View style={styles.preferenceCopy}><Text style={styles.preferenceTitle}>{title}</Text><Text style={styles.preferenceDescription}>{description}</Text></View>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: theme.colors.line, true: theme.colors.accentDark }} thumbColor={theme.colors.surface} />
    </View>
  );
}

export default function ProfileScreen() {
  const [personalizedIdeas, setPersonalizedIdeas] = useState(true);
  const [productSuggestions, setProductSuggestions] = useState(true);
  const [saveHistory, setSaveHistory] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" backgroundColor={theme.colors.canvas} />
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <FadeIn>
          <View style={styles.header}>
            <Pressable accessibilityRole="button" accessibilityLabel="Back to USEIT" onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
            <View style={styles.brand}><BrandMark compact /><Text style={styles.wordmark}>USEIT</Text></View>
            <View style={styles.headerLabel}><Text style={styles.headerLabelText}>YOUR SPACE</Text></View>
          </View>

          <View style={styles.profileHero}>
            <Text style={styles.overline}>YOUR USEIT SPACE</Text>
            <View style={styles.avatar}><Text style={styles.avatarText}>U</Text><View style={styles.avatarSpark}><Text style={styles.sparkText}>✳</Text></View></View>
            <Text style={styles.name}>Your profile</Text>
            <Text style={styles.subtitle}>Make USEIT feel more like you.</Text>
            <View style={styles.memberPill}><View style={styles.memberDot} /><Text style={styles.memberText}>PERSONAL WORKSPACE</Text></View>
          </View>

          <SectionHeader eyebrow="YOUR PREFERENCES" detail="CONTROL YOUR EXPERIENCE" />
          <View style={styles.card}>
            <PreferenceRow title="Personalized ideas" description="Use your selected preferences to shape suggestions." value={personalizedIdeas} onValueChange={setPersonalizedIdeas} />
            <View style={styles.separator} />
            <PreferenceRow title="Product suggestions" description="Include relevant products when they add real value." value={productSuggestions} onValueChange={setProductSuggestions} />
            <View style={styles.separator} />
            <PreferenceRow title="Save my activity" description="Keep a history of analyses on this device." value={saveHistory} onValueChange={setSaveHistory} />
          </View>
          <Text style={styles.preferenceFootnote}>Preview controls for this build. Saved preferences and account sync will be connected in a later release.</Text>

          <SectionHeader eyebrow="ABOUT USEIT" />
          <View style={styles.card}>
            <View style={styles.infoRow}><View><Text style={styles.infoTitle}>App version</Text><Text style={styles.infoSub}>Early access experience</Text></View><Text style={styles.infoValue}>0.1.0</Text></View>
            <View style={styles.separator} />
            <View style={styles.infoRow}><View><Text style={styles.infoTitle}>Privacy first</Text><Text style={styles.infoSub}>Your choices should stay yours.</Text></View><Text style={styles.infoArrow}>↗</Text></View>
          </View>

          <Text style={styles.footer}>LOOK CLOSER. FIND MORE.</Text>
        </FadeIn>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.canvas },
  page: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 48 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, alignItems: 'center', justifyContent: 'center' },
  backText: { color: theme.colors.ink, fontSize: 30, lineHeight: 32, marginTop: -3 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wordmark: { color: theme.colors.ink, fontSize: 15, fontWeight: '900', letterSpacing: -0.6 },
  headerLabel: { backgroundColor: theme.colors.surface, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1, borderColor: theme.colors.line },
  headerLabelText: { color: theme.colors.muted, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  profileHero: { alignItems: 'center', paddingTop: 42, paddingBottom: 26 },
  overline: { color: theme.colors.muted, fontSize: 9, fontWeight: '900', letterSpacing: 1.6 },
  avatar: { width: 94, height: 94, borderRadius: 32, backgroundColor: theme.colors.ink, alignItems: 'center', justifyContent: 'center', marginTop: 22, position: 'relative' },
  avatarText: { color: theme.colors.accent, fontSize: 42, fontWeight: '800', letterSpacing: -2 },
  avatarSpark: { position: 'absolute', right: -6, bottom: -5, width: 31, height: 31, borderRadius: 12, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: theme.colors.canvas },
  sparkText: { color: theme.colors.ink, fontSize: 15 },
  name: { color: theme.colors.ink, fontSize: 29, fontWeight: '800', letterSpacing: -1.1, marginTop: 18 },
  subtitle: { color: theme.colors.muted, fontSize: 13, marginTop: 6 },
  memberPill: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginTop: 17 },
  memberDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.accentDark },
  memberText: { color: theme.colors.muted, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  card: { backgroundColor: theme.colors.surface, borderRadius: 21, borderWidth: 1, borderColor: theme.colors.line, paddingHorizontal: 16 },
  preferenceRow: { minHeight: 78, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  preferenceCopy: { flex: 1, paddingVertical: 12 },
  preferenceTitle: { color: theme.colors.ink, fontSize: 13, fontWeight: '800' },
  preferenceDescription: { color: theme.colors.muted, fontSize: 10, lineHeight: 15, marginTop: 4 },
  separator: { height: 1, backgroundColor: theme.colors.line },
  preferenceFootnote: { color: theme.colors.subtle, fontSize: 9, lineHeight: 14, marginTop: 9, marginHorizontal: 4 },
  infoRow: { minHeight: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  infoTitle: { color: theme.colors.ink, fontSize: 13, fontWeight: '800' },
  infoSub: { color: theme.colors.muted, fontSize: 10, marginTop: 4 },
  infoValue: { color: theme.colors.muted, fontSize: 11, fontWeight: '800' },
  infoArrow: { color: theme.colors.accentDark, fontSize: 18 },
  footer: { color: theme.colors.subtle, fontSize: 8, fontWeight: '900', letterSpacing: 1.8, textAlign: 'center', marginTop: 36 },
});
