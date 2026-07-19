/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FBFBFA',
        ink: {
          DEFAULT: '#1E2022',
          soft: '#3A3D40',
          muted: '#6B6F73',
          faint: '#9AA0A4',
        },
        sage: {
          50: '#F1F5F3',
          100: '#E1EAE5',
          200: '#C8D6CF',
          300: '#A6BBAF',
          400: '#7C9687',
          500: '#4A6B5D',
          600: '#3B5749',
          700: '#2E4539',
          800: '#223329',
        },
        terra: {
          50: '#FBF0EB',
          100: '#F4DBCE',
          200: '#E8B79E',
          300: '#DD9A78',
          400: '#C26D50',
          500: '#A85940',
          600: '#874730',
          700: '#663626',
        },
        line: '#E9E7E1',
        chalk: '#F4F2EC',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        editorial: '-0.02em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(30,32,34,0.04), 0 8px 24px -12px rgba(30,32,34,0.08)',
        ring: '0 0 0 1px rgba(30,32,34,0.06)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawline: {
          '0%': { strokeDashoffset: 'var(--dash, 600)' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        rise: 'rise 0.5s cubic-bezier(0.22,1,0.36,1) both',
        drawline: 'drawline 1.4s ease-out forwards',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
