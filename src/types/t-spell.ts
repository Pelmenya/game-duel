import { THero } from "./t-hero";

export type TSpell = Omit<THero, 'id'> & {
    ownerId: number;
}