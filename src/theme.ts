import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

import customFonts from './fonts';

const theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  fonts: configureFonts(customFonts),
  roundness: 30,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#fe4365',
    accent: '#f1c40f',
    favorite: '#BADA55',
    cancelButton: '#a4c639',
    iconColor: '#808080',
  },
};

export default theme;
