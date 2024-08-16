import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { THero } from '../../types/t-hero';
import { TScores } from '../../components/game-scores/game-scores';

export type TGameSettingsState = {
  heroes: THero[];
  scores: TScores;
}

const initialState: TGameSettingsState = {
  heroes: [
    {
      id: 1,
      x: 50,
      y: 300,
      radius: 20,
      color: 'rgba(0, 0, 0, 0.7)',
      speed: 0.1,
      direction: 1,
      frequency: 2,
    },
    {
      id: 2,
      x: 750,
      y: 300,
      radius: 20,
      color: '#ec8928',
      speed: 0.1,
      direction: -1,
      frequency: 2
    },
  ],
  scores: {
    1: 0,
    2: 0,
  }
};

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    setHeroColor: (state, action: PayloadAction<{ id: number, color: string }>) => {
      state.heroes[action.payload.id].color = action.payload.color;
    },
    setHeroSpeed: (state, action: PayloadAction<{ id: number, speed: number }>) => {
      state.heroes[action.payload.id].speed = action.payload.speed;
    },
    setHeroFrequency: (state, action: PayloadAction<{ id: number, frequency: number }>) => {
      state.heroes[action.payload.id].frequency = action.payload.frequency;
    },
  },
});

export const { setHeroColor, setHeroSpeed, setHeroFrequency } = gameSettingsSlice.actions;

export const gameSettingsReducer = gameSettingsSlice.reducer;
