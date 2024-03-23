import {defineEvent, defineTrace} from '../'

export const ExampleTrace = defineTrace({
  name: 'ExampleTrace',
  version: 1,
  description: 'An example trace for test purposes',
})

export const ExampleEvent = defineEvent<{foo: 'bar'}>({
  name: 'ExampleEvent',
  version: 1,
  description: 'An example event happened',
})
