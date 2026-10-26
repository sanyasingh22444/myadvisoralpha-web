import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Institutional Design Tokens
        navy: {
          DEFAULT: '#081026',
          deep: '#050B1B',
          surface: '#0B1528',
          card: '#0F1D38',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        gold: {
          DEFAULT: '#F5BA31',
          hover: '#E5AB28',
          dark: '#D49B1F',
          light: '#FFF5DC',
          muted: 'rgba(245, 186, 49, 0.15)',
        },
        cream: {
          DEFAULT: '#FAF7EE',
          surface: '#F4EFE0',
          dark: '#E8E1CE',
        },
        institutional: {
          dark: '#081026',         // Canvas base, primary dark background
          card: '#0B1528',         // Dark card containers, surface panels
          pill: '#16233B',         // Floating header pill, dark input surfaces
          blue: '#0066f5',         // Secondary accent
          gold: '#F5BA31',         // Primary Gold accent
          blueHover: '#0052cc',
          green: '#166534',        // High-contrast trust green
          greenLight: '#dcfce7',
          blueLight: '#dbeafe',
          blueDark: '#1e40af',
          coral: '#EC6446',        // Action coral / alert / hot CTA buttons
        },
        badge: {
          blueBg: '#dbeafe',
          blueText: '#1e40af',
          greenBg: '#dcfce7',
          greenText: '#166534',
        },
        brand: {
          dark: '#010101',
          surface: '#0B0E14',
          slate: '#383B42',
          blue: '#0066f5',
          blueDark: '#0052cc',
          blueHover: '#1A6DE0',
          cyan: '#3DA2F1',
          green: '#166534',
          coral: '#EC6446',
          yellow: '#FCF50F',
          borderDark: '#2A2A2A',
          borderLight: '#EBEBEB',
          textMuted: '#757575',
          textSubtle: '#B9B9B9',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        tight: ['var(--font-inter-tight)', 'Inter Tight', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'brand-glow': '0px 4px 32px 0px rgba(0, 102, 245, 0.15)',
        'coral-glow': '0px 4px 24px 0px rgba(236, 100, 70, 0.25)',
        'card-soft': '0px 2px 16px 0px rgba(0, 0, 0, 0.06)',
        'card-dark': '0px 4px 24px 0px rgba(0, 0, 0, 0.40)',
      },
      borderRadius: {
        'pill': '48px',
        'card': '32px',
        'card-sm': '24px',
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite linear',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
