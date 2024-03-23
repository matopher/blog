/**
 * Pluralize or singularize a word based on the passed in count.
 *
 * @param word
 * @param count
 * @param inclusive
 * @public
 */
declare const pluralize: {
  (word: string, count?: number, inclusive?: boolean): string
  /**
   * Pluralize a word based.
   *
   * @param word
   */
  plural(word: string): string
  /**
   * Singularize a word based.
   *
   * @param word
   */
  singular(word: string): string
  /**
   * Add a pluralization rule to the collection.
   *
   * @param rule
   * @param replacement
   */
  addPluralRule(rule: Rule, replacement: string): void
  /**
   * Add a singularization rule to the collection.
   *
   * @param rule
   * @param replacement
   */
  addSingularRule(rule: Rule, replacement: string): void
  /**
   * Add an irregular word definition.
   *
   * @param single
   * @param plural
   */
  addIrregularRule(single: string, plural: string): void
  /**
   * Add an uncountable word rule.
   *
   * @param rule
   */
  addUncountableRule(rule: Rule): void
  /**
   * Test if provided word is plural.
   *
   * @param word
   */
  isPlural(word: string): boolean
  /**
   * Test if provided word is singular.
   *
   * @param word
   */
  isSingular(word: string): boolean
}
export default pluralize

/** @public */
export declare type Rule = RegExp | string

export {}
