import {CliClientOptions} from '@sanity/cli'
import {CliConfig} from '@sanity/cli'
import {createCliConfig} from '@sanity/cli'
import {defineCliConfig} from '@sanity/cli'
import {getCliClient} from '@sanity/cli'

export {CliClientOptions}

export {CliConfig}

export {createCliConfig}

export {defineCliConfig}

export {getCliClient}

/**
 * Get environment variables prefixed with SANITY_STUDIO_, as an object.
 *
 * @param options - Options for the environment variable loading
 *  {@link StudioEnvVariablesOptions}
 * @returns Object of studio environment variables
 *
 * @example
 * ```tsx
 * getStudioEnvironmentVariables({prefix: 'process.env.', jsonEncode: true})
 * ```
 *
 * @public
 */
export declare function getStudioEnvironmentVariables(
  options?: StudioEnvVariablesOptions,
): Record<string, string>

/**
 * The params for the `getStudioEnvironmentVariables` function that gets Studio focused environment variables.
 *
 * @public
 */
export declare interface StudioEnvVariablesOptions {
  /**
   * When specified adds a prefix to the environment variable keys,
   * eg: `getStudioEnvironmentVariables({prefix: 'process.env.'})`
   */
  prefix?: string
  /**
   * When specified includes environment variables from dotenv files (`.env`), in the same way the studio does.
   * A `mode` must be specified, usually `development`
   * or `production`, which will load the corresponding `.env.development` or `.env.production`.
   * To specify where to look for the dotenv files, specify `options.envFile.envDir`.
   */
  envFile?:
    | {
        mode: string
        envDir?: string
      }
    | false
  /**
   * When specified, JSON-encodes the values, which is handy if you want to pass
   * this to a bundlers hardcoded defines, such as Vite's `define` or Webpack's `DefinePlugin`.
   */
  jsonEncode?: boolean
}

export {}
