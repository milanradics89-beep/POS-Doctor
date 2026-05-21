/**
 * Design tokens - aligned with design guidelines
 */

export const COLORS = {
  // Functional
  ok: '#22c55e',
  warning: '#f59e0b',
  fault: '#ef4444',
  scanning: '#3b82f6',

  // Status tints
  okBg: 'rgba(34,197,94,0.14)',
  warningBg: 'rgba(245,158,11,0.16)',
  faultBg: 'rgba(239,68,68,0.16)',
  infoBg: 'rgba(59,130,246,0.14)',
  unknownBg: 'rgba(127,142,163,0.14)',

  // Surfaces
  bg: '#0B0D10',
  bgElevated: '#10141A',
  card: '#121823',
  card2: '#0F1520',
  border: '#243042',
  divider: '#1B2533',

  // Text
  textPrimary: '#EAF0F7',
  textSecondary: '#B7C3D4',
  textMuted: '#7F8EA3',
  textInverse: '#0B0D10',
} as const;

export const FONT_SIZES = {
  h1: 28,
  h2: 18,
  h3: 16,
  body: 15,
  meta: 13,
  mono: 13,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 16,
  xl: 24,
  xxl: 32,
  screenX: 16,
  screenY: 14,
  cardPad: 14,
  rowGap: 10,
} as const;

export const RADIUS = {
  sm: 10,
  md: 14,
  lg: 18,
  pill: 999,
} as const;

export const TOUCH_TARGET = 44;

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  ok: { bg: COLORS.okBg, text: COLORS.ok },
  warning: { bg: COLORS.warningBg, text: COLORS.warning },
  fault: { bg: COLORS.faultBg, text: COLORS.fault },
  unknown: { bg: COLORS.unknownBg, text: COLORS.textSecondary },
  running: { bg: COLORS.infoBg, text: COLORS.scanning },
  info: { bg: COLORS.infoBg, text: COLORS.scanning },
};
