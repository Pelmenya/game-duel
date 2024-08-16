import { RootState } from "../store";

export const selectHeroes = (state: RootState) => state.gameSettings.heroes;
