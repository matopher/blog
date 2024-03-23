/** @public */
export declare const black: ColorTint

/** @public */
export declare const blue: ColorTints

/** @internal */
export declare function buildTints(options: {
  hueKey: ColorHueKey
  black: ColorTintConfig
  color: ColorHueConfig
}): ColorTints

/** @public */
export declare interface Color extends ColorHues {
  black: ColorTint
  white: ColorTint
}

/** @public */
export declare const color: Color

/**
 * Color hue keys.
 * @public
 */
export declare const COLOR_HUES: ColorHueKey[]

/**
 * Color tint keys.
 * @public
 */
export declare const COLOR_TINTS: ColorTintKey[]

/** @internal */
export declare interface ColorConfig {
  black: ColorTintConfig
  white: ColorTintConfig
  gray: ColorHueConfig
  blue: ColorHueConfig
  purple: ColorHueConfig
  magenta: ColorHueConfig
  red: ColorHueConfig
  orange: ColorHueConfig
  yellow: ColorHueConfig
  green: ColorHueConfig
  cyan: ColorHueConfig
}

/** @internal */
export declare interface ColorHueConfig {
  title: string
  tints: {
    [key in ColorTintKey]: ColorTintConfig
  }
}

/** @public */
export declare type ColorHueKey =
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'magenta'

/** @public */
export declare type ColorHues = {
  [key in ColorHueKey]: ColorTints
}

/** @public */
export declare interface ColorTint {
  hex: string
  title: string
}

/** @internal */
export declare interface ColorTintConfig {
  title: string
  hsl: HSL
}

/** @public */
export declare type ColorTintKey =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950'

/** @public */
export declare type ColorTints = {
  [key in ColorTintKey]: ColorTint
}

/** @internal */
export declare const config: ColorConfig

/** @public */
export declare const cyan: ColorTints

/**
 * Apply the `darken` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingdarken
 *
 * @internal
 */
export declare function darken(b: RGB, s: RGB): RGB

/** @public */
export declare const gray: ColorTints

/** @public */
export declare const green: ColorTints

/** @internal */
export declare function hexToRgb(hex: string): RGB

/** @internal */
export declare type HSL = [number, number, number]

/** @internal */
export declare function hslToRgb(hsl: HSL): RGB

/** @public */
export declare const hues: ColorHues

/** @internal */
export declare function limit(darkest: RGB, lightest: RGB, source: RGB): RGB

/** @public */
export declare const magenta: ColorTints

/** @public */
export declare const orange: ColorTints

/** @public */
export declare const purple: ColorTints

/** @public */
export declare const red: ColorTints

/** @internal */
export declare type RGB = [number, number, number]

/** @internal */
export declare function rgbToHex([r, g, b]: RGB): string

/**
 * @see https://css-tricks.com/converting-color-spaces-in-javascript/
 *
 * @internal
 */
export declare function rgbToHsl([r, g, b]: RGB): HSL

/**
 * Apply the `screen` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingscreen
 *
 * @internal
 */
declare function screen_2(b: RGB, s: RGB): RGB
export {screen_2 as screen}

/** @public */
export declare const white: ColorTint

/** @public */
export declare const yellow: ColorTints

export {}
