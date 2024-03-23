import {SanityClient} from '@sanity/client'

/**
 * Decorates a sanity client to limit the concurrency of `client.fetch`
 * requests. Keeps the concurrency limit state and returns wrapped clients with
 * that same state if the `clone` `config` or `withConfig` methods are called.
 */
export declare function createClientConcurrencyLimiter(
  maxConcurrency: number,
): (input: SanityClient) => SanityClient

export {}
