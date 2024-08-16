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
    },
    {
      id: 2,
      x: 750,
      y: 300,
      radius: 20,
      color: '#ec8928',
      speed: 0.1,
      direction: -1,
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
    increment: (state) => {

    },
    decrement: (state) => {

    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {

    },
  },
});

export const { increment, decrement, incrementByAmount } = gameSettingsSlice.actions;

export const gameSettingsReducer = gameSettingsSlice.reducer;
