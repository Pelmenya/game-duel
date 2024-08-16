import { RootState } from "../store";

export const selectHeroes = (state: RootState) => state.gameSettings.heroes;
export const selectScores = (state: RootState) => state.gameSettings.scores;
