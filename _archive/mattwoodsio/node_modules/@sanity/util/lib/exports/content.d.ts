/**
 * Looks at the value and determines if it is deeply empty while not considering _type and _key attributes on objects.
 * A value will be considered deeply empty if it is:
 *  - undefined or null
 *  - an object where all property values are deeply empty
 *  - an array where all items are deeply empty
 * @param value - the value to check for deep emptiness
 */
export declare function isDeepEmpty(value: unknown): boolean

declare function isDeepEmptyArray(value: unknown[]): boolean

declare function isDeepEmptyObject(value: {[key: string]: any}): boolean

/**
 * @deprecated Use `isDeepEmpty` instead
 * todo: remove in v4
 */
export declare const isEmpty: typeof isDeepEmpty

/**
 * @deprecated Use `isDeepEmpty` instead
 * todo: remove in v4
 */
export declare const isEmptyArray: typeof isDeepEmptyArray

/**
 * @deprecated Use `isDeepEmpty` instead
 * todo: remove in v4
 */
export declare const isEmptyObject: typeof isDeepEmptyObject

export declare function isShallowEmptyObject(value: {[key: string]: unknown}): boolean

export declare function randomKey(length?: number): string

export declare function resolveTypeName(value: unknown): string

export {}
