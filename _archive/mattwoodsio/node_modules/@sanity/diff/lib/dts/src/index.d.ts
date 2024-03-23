/**
 * Diff for something that has been added - eg a property in an object,
 * an item in an array, a segment of a string or similar.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @typeParam V - Value. The type of the destination (eg `after` or `to`) value.
 * @public
 */
export declare interface AddedDiff<A, V> {
  action: 'added'
  isChanged: true
  fromValue: null | undefined
  toValue: V
  annotation: A
}

/**
 * Diff for an array value.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @typeParam V - Item value type.
 * @public
 */
export declare type ArrayDiff<A, V = unknown> = FullDiff<A, V[]> & {
  type: 'array'
  items: ItemDiff<A>[]
}

/**
 * Input type for array values. Helper functions are available for getting the item and/or
 * annotation at a given index.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare interface ArrayInput<A> extends BaseInput<A> {
  type: 'array'
  /**
   * The actual array value
   */
  value: unknown[]
  /**
   * The length of the array
   */
  length: number
  /**
   * Retrieve the value at the given `index`, automatically wrapping it in an input container.
   *
   * @param index - The index of the item to retrieve
   * @returns Typed input container, or `undefined` if the item does not exist
   */
  at(index: number): Input<A>
  /**
   * Retrieve the _annotation_ for an item at the given index
   *
   * @param index - The index of the item to fetch the annotation for
   * @returns The annotation at the given index, or `undefined` if the item does not exist
   */
  annotationAt(index: number): A
}

/**
 * Shared properties for all input types
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare interface BaseInput<A> {
  annotation: A
}

/**
 * Diff of a boolean.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare type BooleanDiff<A> = FullDiff<A, boolean> & {
  type: 'boolean'
}

/**
 * Input type for booleans.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare interface BooleanInput<A> extends BaseInput<A> {
  type: 'boolean'
  value: boolean
}

/**
 * Diff for something that has changed - eg it was not added or removed, but the
 * value has changed "in place". Note that {@link TypeChangeDiff} is used for values that change
 * their _type_, thus the `V` type parameter represents both the source and the destination value
 * in this type.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @typeParam V - Value. The type of the value.
 * @public
 */
export declare interface ChangedDiff<A, V> {
  action: 'changed'
  isChanged: true
  fromValue: V
  toValue: V
  annotation: A
}

/**
 * Diff for any value type.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare type Diff<A> =
  | NullDiff<A>
  | StringDiff<A>
  | NumberDiff<A>
  | BooleanDiff<A>
  | ObjectDiff<A>
  | ArrayDiff<A>
  | TypeChangeDiff<A>

/**
 * Takes a `from` and `to` input and calulates a diff between the two
 *
 * @param fromInput - The source (`from`) input - use {@link wrap | the wrap() method} to generate an "input"
 * @param toInput - The destination (`to`) input - use {@link wrap | the wrap() method} to generate an "input"
 * @param options - Options for the diffing process - currently no options are defined
 * @returns A diff object representing the change
 * @public
 */
export declare function diffInput<A>(
  fromInput: Input<A>,
  toInput: Input<A>,
  options?: DiffOptions,
): Diff<A>

/**
 * Options available for doing diffs. Currently no options are defined.
 *
 * @public
 */
export declare type DiffOptions = Record<string, never>

/**
 * Diff with all the possible diff types.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @typeParam V - Value. Type of the value repesented in the diff.
 * @public
 */
export declare type FullDiff<A, V> =
  | AddedDiff<A, V>
  | RemovedDiff<A, V>
  | ChangedDiff<A, V>
  | UnchangedDiff<A, V>

/**
 * An "input" holds the _type_ of the value, the actual value, an optional annotation,
 * along with potential helper methods and properties, which vary dependending on the type
 *
 * @public
 */
export declare type Input<T> =
  | NumberInput<T>
  | BooleanInput<T>
  | StringInput<T>
  | NullInput<T>
  | ObjectInput<T>
  | ArrayInput<T>

/**
 * Diff of an item in an array, representing whether or not it has moved within the array,
 * and if so, which index it was moved from/to.
 *
 * If not moved, `fromIndex` and `toIndex` will have the same value.
 * If the item was added, `fromIndex` will be `undefined`.
 * If the item was removed, `toIndex` will be `undefined`.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare interface ItemDiff<A> {
  fromIndex: number | undefined
  toIndex: number | undefined
  hasMoved: boolean
  diff: Diff<A>
  annotation: A
}

/**
 * Diff for a `null` value.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare type NullDiff<A> = FullDiff<A, null> & {
  type: 'null'
}

/**
 * Input type for `null` values.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare interface NullInput<A> extends BaseInput<A> {
  type: 'null'
  value: null
}

/**
 * Diff of a number.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare type NumberDiff<A> = FullDiff<A, number> & {
  type: 'number'
}

/**
 * Input type for numbers.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare interface NumberInput<A> extends BaseInput<A> {
  type: 'number'
  value: number
}

/**
 * Diff for an object value.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @typeParam T - Value type.
 * @public
 */
export declare type ObjectDiff<A, T extends object = Record<string, any>> = FullDiff<A, T> & {
  type: 'object'
  fields: Record<keyof T, Diff<A>>
}

/**
 * Input type for object values. Caches the available keys, and allows retrieval of properties,
 * while automatically wrapping the retrieved property in a typed input container.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare interface ObjectInput<A> extends BaseInput<A> {
  type: 'object'
  /**
   * The actual object value
   */
  value: Record<string, unknown>
  /**
   * The keys of the object
   */
  keys: string[]
  /**
   * Retrieve the property with the given `key`, automatically wrapping it in an input container.
   *
   * @param key - The key of the property you want to retrieve.
   * @returns Typed input container, or `undefined` if the property does not exist
   */
  get(key: string): Input<A> | undefined
}

/**
 * Diff for something that has been removed - eg a property in an object,
 * an item in an array, a segment of a string or similar.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @typeParam V - Value. The type of the source (eg `before` or `from`) value.
 * @public
 */
export declare interface RemovedDiff<A, V> {
  action: 'removed'
  isChanged: true
  fromValue: V
  toValue: null | undefined
  annotation: A
}

/**
 * Diff of a string. Holds an additional array of string _segments_,
 * indicating which portions of the string is changed/unchanged.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare type StringDiff<A> = FullDiff<A, string> & {
  type: 'string'
  segments: StringDiffSegment<A>[]
}

/**
 * Diff of a string segment (eg a portion/slice), and whether or not it was changed or unchanged.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare type StringDiffSegment<A> = StringSegmentChanged<A> | StringSegmentUnchanged

/**
 * Input type for strings, which supports slicing parts of the string while maintaining the
 * annotation of the parent.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare interface StringInput<A> extends BaseInput<A> {
  type: 'string'
  value: string
  sliceAnnotation(
    start: number,
    end: number,
  ): {
    text: string
    annotation: A
  }[]
}

/**
 * Diff of a string segment that has changed.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare interface StringSegmentChanged<A> {
  type: 'stringSegment'
  action: 'added' | 'removed'
  text: string
  annotation: A
}

/**
 * Diff of a string segment that is unchanged.
 *
 * @public
 */
export declare interface StringSegmentUnchanged {
  type: 'stringSegment'
  action: 'unchanged'
  text: string
}

/**
 * Diff for a value that has changed from one type to another.
 * For example, an object property going from `null` to `string`.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @public
 */
export declare interface TypeChangeDiff<A> {
  type: 'typeChange'
  action: 'changed'
  isChanged: true
  fromType: string
  fromValue: unknown
  fromDiff: Diff<A> & {
    action: 'removed'
  }
  toType: string
  toValue: unknown
  toDiff: Diff<A> & {
    action: 'added'
  }
  annotation: A
}

/**
 * Diff (or lack thereof, in this case) for a value that has _not_ changed.
 *
 * @typeParam A - Annotation. Timestamps, author and similar info is attached by Sanity, but anything is allowed.
 * @typeParam V - Value. The type of the destination (eg `after`) value.
 * @public
 */
export declare interface UnchangedDiff<A, V> {
  action: 'unchanged'
  isChanged: false
  fromValue: V
  toValue: V
}

/**
 * The recognized diff value types
 *
 * @public
 */
export declare type ValueType =
  | 'array'
  | 'boolean'
  | 'null'
  | 'number'
  | 'object'
  | 'string'
  | 'undefined'

/**
 * Takes an input (any JSON-serializable value) and an annotation, and generates an input
 * object for it, to be used with {@link diffInput | the diffInput() method} and others.
 *
 * @param input - The value to wrap in an input object
 * @param annotation - Annotation attached to the input - will be bound to generated diffs
 * @returns A input object
 * @throws if `input` is not a JSON-serializable type
 * @public
 */
export declare function wrap<A>(input: unknown, annotation: A): Input<A>

export {}
