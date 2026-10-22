import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#ff4081',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#000000',
    placeholder: '#757575',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    // Custom colors for the app
    rizz: {
      dry: '#f44336',      // Red - "Dry as a saltine"
      cringe: '#ff9800',   // Orange - "Cringe-core"
      mid: '#ffeb3b',      // Yellow - "Mid rizz"
      smooth: '#4caf50',   // Green - "Smooth"
      certified: '#2196f3', // Blue - "Certified Rizzler"
      godTier: '#9c27b0',  // Purple - "God-tier Game"
    },
    gradient: {
      primary: ['#6200ee', '#9c27b0'],
      accent: ['#ff4081', '#ff6b9d'],
      rizz: ['#ff4081', '#6200ee', '#9c27b0'],
    }
  },
  roundness: 12,
};

export const rizzScale = [
  { value: 0, label: 'Dry as a saltine', emoji: '❌', color: theme.colors.rizz.dry },
  { value: 1, label: 'Cringe-core', emoji: '😬', color: theme.colors.rizz.cringe },
  { value: 2, label: 'Mid rizz', emoji: '😏', color: theme.colors.rizz.mid },
  { value: 3, label: 'Smooth', emoji: '🔥', color: theme.colors.rizz.smooth },
  { value: 4, label: 'Certified Rizzler', emoji: '💯', color: theme.colors.rizz.certified },
  { value: 5, label: 'God-tier Game', emoji: '💋', color: theme.colors.rizz.godTier },
];

export const rizzCategories = [
  { id: 'bold', label: 'Bold', icon: '💪', color: '#f44336' },
  { id: 'funny', label: 'Funny', icon: '😂', color: '#ff9800' },
  { id: 'cringe', label: 'Cringe', icon: '😬', color: '#ffeb3b' },
  { id: 'sweet', label: 'Sweet', icon: '🥰', color: '#4caf50' },
  { id: 'risque', label: 'Risqué', icon: '😈', color: '#9c27b0' },
];
