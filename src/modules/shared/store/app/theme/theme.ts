import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { Theme } from '../../../types/theme';
import { ThemeService } from './helper/service';
import config from '../../../config/config';

type ThemeStore = {
  name: string;
} & Theme;

const initialState: ThemeStore = {
  name: config.settings.defaultTheme,
  ...ThemeService.getTheme(config.settings.defaultTheme),
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setActiveTheme: (state, action: PayloadAction<string>) => {
      const t = action.payload;
      if (ThemeService.has(t)) {
        const { background, text, button, input, border } =
          ThemeService.getTheme(t);
        state.background = background;
        state.text = text;
        state.button = button;
        state.input = input;
        state.border = border;
        state.name = t;
      } else if (t === 'custom') {
        state.name = t;
      }
    },
    setCustomTheme: (state, action: PayloadAction<Theme>) => {
      if (state.name === 'custom') {
        state.background = action.payload.background;
        state.text = action.payload.text;
      }
    },
  },
});

export default ThemeSlice.reducer;

export const { setActiveTheme, setCustomTheme } = ThemeSlice.actions;

export const getThemeOptions = (state: RootState) => ({
  active: state.app.themes.name,
  all: [...ThemeService.getAll()],
});

export const getTheme = createSelector(
  [(state: RootState) => state.app.themes],
  ({ background, text, button, input, border }) => ({
    background,
    text,
    button,
    input,
    border,
  })
);
