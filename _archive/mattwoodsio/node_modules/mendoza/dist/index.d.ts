export declare function applyPatch(left: any, patch: RawPatch): any

declare function applyPatch_2<T>(left: Value<T>, patch: RawPatch, startMeta: T): Value<T>

declare type ArrayContent<T> = {
  type: 'array'
  elements: Value<T>[]
  metas: T[]
}

declare type Content<T> = ObjectContent<T> | ArrayContent<T> | StringContent<T>

declare function getType<T>(value: Value<T>): Type

declare namespace incremental {
  export {
    wrap,
    unwrap,
    getType,
    rebaseValue,
    applyPatch_2 as applyPatch,
    Value,
    Type,
    Content,
    ObjectContent,
    ArrayContent,
    StringContent,
    StringPart,
  }
}
export {incremental}

declare type ObjectContent<T> = {
  type: 'object'
  fields: {
    [key: string]: Value<T>
  }
}

export declare type RawOperation = any

export declare type RawPatch = RawOperation[]

declare function rebaseValue<T>(left: Value<T>, right: Value<T>): Value<T>

declare type StringContent<T> = {
  type: 'string'
  parts: StringPart<T>[]
}

declare type StringPart<T> = {
  value: string
  utf8size: number
  uses: StringContent<T>[]
  startMeta: T
  endMeta: T
}

declare type Type = 'array' | 'string' | 'object' | 'number' | 'boolean' | 'null'

declare function unwrap<T>(value: Value<T>): unknown

declare type Value<T> = {
  data?: unknown
  content?: Content<T>
  startMeta: T
  endMeta: T
}

declare function wrap<T>(data: unknown, meta: T): Value<T>

export {}
