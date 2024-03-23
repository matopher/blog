declare class TypeID<const T extends string> {
    private prefix;
    private suffix;
    constructor(prefix: T, suffix?: string);
    getType(): T;
    getSuffix(): string;
    asType<const U extends string>(prefix: U): TypeID<U>;
    toUUIDBytes(): Uint8Array;
    toUUID(): string;
    toString(): string;
    static fromString<const T extends string>(str: string): TypeID<T>;
    static fromUUIDBytes<const T extends string>(prefix: T, bytes: Uint8Array): TypeID<T>;
    static fromUUID<const T extends string>(prefix: T, uuid: string): TypeID<T>;
}
declare function typeid<T extends string>(): TypeID<''>;
declare function typeid<T extends string>(prefix: T): TypeID<T>;
declare function typeid<T extends string>(prefix: T, suffix: string): TypeID<T>;

export { TypeID, typeid };
