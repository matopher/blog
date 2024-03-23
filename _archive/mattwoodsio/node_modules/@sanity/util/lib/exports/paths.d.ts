import {Path} from '@sanity/types'
import {PathSegment} from '@sanity/types'

export declare const FOCUS_TERMINATOR = '$'

export declare function fromString(path: string): Path

export declare function get<R>(obj: unknown, path: Path | string): R | undefined

export declare function get<R>(obj: unknown, path: Path | string, defaultValue: R): R

export declare function hasFocus(focusPath: Path, path: Path): boolean

export declare function hasItemFocus(focusPath: Path, item: PathSegment): boolean

export declare function isEqual(path: Path, otherPath: Path): boolean

export declare function isExpanded(segment: PathSegment, focusPath: Path): boolean

export declare function isSegmentEqual(segmentA: PathSegment, segmentB: PathSegment): boolean

export declare function numEqualSegments(path: Path, otherPath: Path): number

export declare function pathFor(path: Path): Path

/**
 * Takes a value and a path that may include numeric indices and attempts to replace numeric indices with keyed paths
 *
 * @param value - any json value
 * @param path - a Path that may include numeric indices
 * @returns a path where numeric indices has been replaced by keyed segments (e.g. `{_key: <key>}`)
 * Will do as good attempt as possible, but in case of missing array items, it will return the best possible match:
 * - `resolveKeyedPath([0, 'bar'], [])` will return [] since array has no value at index 0
 * - `resolveKeyedPath([0, 'foo'], [{_key: 'xyz', 'foo': 'bar'}, {_key: 'abc'}])` will return `[{_key: 'xyz'}, 'foo']` since array has no value at index 0
 * - `resolveKeyedPath([0, 'foo', 'bar'], [{_key: 'xyz'}])` will return `[{_key: 'xyz'}, 'foo', 'bar']` since array has no value at index 0
 * Object keys will be preserved as-is, e.g. `resolveKeyedPath(['foo', 'bar'], undefined)` will return `['foo', 'bar']`
 */
export declare function resolveKeyedPath(value: unknown, path: Path): Path

export declare function _resolveKeyedPath(value: unknown, path: Path): Path

export declare function startsWith(prefix: Path, path: Path): boolean

declare function toString_2(path: Path): string
export {toString_2 as toString}

export declare function trimChildPath(path: Path, childPath: Path): Path

export declare function trimLeft(prefix: Path, path: Path): Path

export declare function trimRight(suffix: Path, path: Path): Path

export {}
