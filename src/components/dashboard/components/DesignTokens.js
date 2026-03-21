/**
 * Design Tokens for Consistent Dashboard Styling
 * Single source of truth for spacing, colors, shadows, animations
 */

export const SPACING = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

export const BORDER_RADIUS = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
};

export const TRANSITIONS = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
};

export const COLORS = {
  primary: '#6C4CF1',
  secondary: '#00C2A8',
  accent: '#FFD166',
  danger: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Grayscale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Dark mode
  dark: {
    50: '#F9FAFB',
    100: '#0F172A',
    200: '#1E293B',
    300: '#334155',
    400: '#475569',
    500: '#64748B',
  },
};

export const TYPOGRAPHY = {
  heading1: 'text-3xl font-black leading-tight tracking-tight',
  heading2: 'text-2xl font-bold leading-snug tracking-tight',
  heading3: 'text-xl font-bold leading-snug',
  heading4: 'text-lg font-semibold leading-snug',
  body: 'text-base font-normal leading-relaxed',
  bodySmall: 'text-sm font-normal leading-relaxed',
  label: 'text-xs font-semibold leading-tight uppercase tracking-wider',
  caption: 'text-xs font-normal leading-tight text-gray-500 dark:text-gray-400',
};

export const COMPONENT_SIZES = {
  button: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  },
  input: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base',
  },
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
  },
};

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '1024px',
  desktop: '1280px',
};

/**
 * Utility Functions
 */

export const getColorClasses = (colorName, variant = 'bg') => {
  const colorMap = {
    purple: 'bg-[#6C4CF1]',
    teal: 'bg-[#00C2A8]',
    amber: 'bg-[#FFD166]',
    red: 'bg-red-600',
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    gray: 'bg-gray-600',
  };
  
  return colorMap[colorName] || colorMap.purple;
};

export const getStatusColor = (status) => {
  const statusColors = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-amber-600 dark:text-amber-400',
    info: 'text-blue-600 dark:text-blue-400',
  };
  return statusColors[status] || statusColors.info;
};

export const getCSSVariable = (name) => {
  return `var(--${name})`;
};
