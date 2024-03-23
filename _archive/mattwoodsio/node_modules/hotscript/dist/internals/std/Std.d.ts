export declare namespace Std {
    type _Pick<a, k extends keyof a> = Pick<a, k>;
    type _Omit<a, k extends PropertyKey> = Omit<a, k>;
    type _Extract<a, b> = Extract<a, b>;
    type _Exclude<a, b> = Exclude<a, b>;
    type _Uppercase<a extends string> = Uppercase<a>;
    type _Lowercase<a extends string> = Lowercase<a>;
    type _Capitalize<a extends string> = Capitalize<a>;
    type _Uncapitalize<a extends string> = Uncapitalize<a>;
    type _Record<k extends PropertyKey, v> = Record<k, v>;
    type _Readonly<a> = Readonly<a>;
    type _Required<a> = Required<a>;
    type _Partial<a> = Partial<a>;
    type _NonNullable<a> = NonNullable<a>;
}
