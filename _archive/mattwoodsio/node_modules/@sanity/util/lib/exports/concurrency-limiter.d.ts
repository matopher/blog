/**
 * ConcurrencyLimiter manages the number of concurrent operations that can be performed.
 * It ensures that the number of operations does not exceed a specified maximum limit.
 */
export declare class ConcurrencyLimiter {
  max: number
  current: number
  resolvers: Array<() => void>
  constructor(max: number)
  /**
   * Indicates when a slot for a new operation is ready.
   * If under the limit, it resolves immediately; otherwise, it waits until a slot is free.
   */
  ready: () => Promise<void>
  /**
   * Releases a slot, decrementing the current count of operations if nothing is in the queue.
   * If there are operations waiting, it allows the next one in the queue to proceed.
   */
  release: () => void
}

export {}
