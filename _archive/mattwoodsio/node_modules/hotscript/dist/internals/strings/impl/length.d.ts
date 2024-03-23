import { Add } from "../../numbers/impl/addition";
import { StringIterator as StrIter } from "./utils";
type LengthUp<Str extends string, Length extends number | bigint = 0, It extends StrIter.Iterator = StrIter.Init> = StrIter.Double<It> extends infer $DoubleIt extends StrIter.Iterator ? StrIter.CutAt<Str, $DoubleIt> extends `${infer $Rest}` ? StrIter.Size<It> extends 12 ? LengthDown<$Rest, Add<Length, StrIter.Value<$DoubleIt>>, $DoubleIt> : LengthUp<$Rest, Add<Length, StrIter.Value<$DoubleIt>>, $DoubleIt> : StrIter.CutAt<Str, It> extends `${infer $Rest}` ? LengthUp<$Rest, Add<Length, StrIter.Value<It>>, It> : LengthDown<Str, Length, StrIter.Prev<It>> : never;
type LengthDown<Str extends string, Length extends number | bigint, It> = It extends StrIter.Iterator ? StrIter.CutAt<Str, It> extends `${infer $Rest}` ? LengthDown<$Rest, Add<Length, StrIter.Value<It>>, It> : LengthDown<Str, Length, StrIter.Prev<It>> : Length;
export type Length<T extends string> = T extends "" ? 0 : LengthUp<T>;
export {};
