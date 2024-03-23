import { DivMod } from "../../numbers/impl/division";
import { Sub } from "../../numbers/impl/substraction";
type RepeatX2<T extends string> = `${T}${T}`;
export type Repeat<T extends string, N extends number, Acc extends string = "", Calc extends {
    Quotient: number;
    Remainder: number;
} = DivMod<N, 2>> = N extends 0 ? Acc : N extends 1 ? `${Acc}${T}` : Calc["Remainder"] extends 0 ? Repeat<RepeatX2<T>, Calc["Quotient"], Acc> : Repeat<T, Sub<N, 1>, `${Acc}${T}`>;
export {};
