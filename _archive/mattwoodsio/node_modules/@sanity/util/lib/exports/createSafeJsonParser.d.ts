/**
 * Create a safe JSON parser that is able to handle lines interrupted by an error object.
 *
 * This may occur when streaming NDJSON from the Export HTTP API.
 *
 * @internal
 * @see {@link https://github.com/sanity-io/sanity/pull/1787 | Initial pull request}
 */
export declare function createSafeJsonParser<Type>({errorLabel}: Options): Parser<Type>

declare interface Options {
  errorLabel: string
}

declare type Parser<Type> = (line: string) => Type

export {}
