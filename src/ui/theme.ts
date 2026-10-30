export const theme = {
  colors: {
    canvas: '#F5F4EF',
    surface: '#FFFFFF',
    surfaceMuted: '#ECEDE6',
    ink: '#171A18',
    muted: '#747A73',
    subtle: '#A0A59D',
    line: '#E2E4DC',
    accent: '#D9F36A',
    accentDark: '#B6D64A',
    mint: '#D8EDE1',
    blue: '#DCE8F8',
    peach: '#F4E2D4',
    lavender: '#E9E3F4',
    danger: '#B84F43',
    dark: '#171B19',
    darkMuted: '#AEB6AE',
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 22, xxl: 30, section: 38 },
  radius: { sm: 12, md: 18, lg: 24, xl: 30, pill: 999 },
  type: {
    eyebrow: 10,
    caption: 12,
    body: 15,
    title: 22,
    hero: 46,
  },
} as const;

export type UseitTheme = typeof theme;
