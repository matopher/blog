export declare const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'

export declare const DEFAULT_TIME_FORMAT = 'HH:mm'

export declare function format(input: Date, format: string, useUTC?: boolean): string

export declare function parse(dateString: string, format: string): ParseResult

export declare type ParseResult = {
  isValid: boolean
  date?: Date
  error?: string
} & (
  | {
      isValid: true
      date: Date
    }
  | {
      isValid: false
      error?: string
    }
)

export {}
