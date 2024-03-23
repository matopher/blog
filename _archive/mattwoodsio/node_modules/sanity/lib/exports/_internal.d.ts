import {CliCommandDefinition} from '@sanity/cli'
import {CliCommandGroupDefinition} from '@sanity/cli'

/**
 * @deprecated Not actually deprecated, but these are internals and should not be relied upon outside of the Sanity team
 * @internal
 */
export declare const cliProjectCommands: {
  requiredCliVersionRange: string
  commands: (CliCommandGroupDefinition | CliCommandDefinition<Record<string, unknown>>)[]
}

export {}
