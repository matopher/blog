# @sanity/telemetry

Utils for collecting telemetry data from Sanity CLI and Sanity Studio

## Usage

### Track a one-off event

```typescript
import {defineEvent} from '@sanity/telemetry'

const ExampleEvent = defineEvent<{foo: string}>({
  name: 'Example Event',
  version: 1,
})

telemetry.log(ExampleEvent, {foo: 'bar'})
```

### Track a group of events in a trace

A trace represents a long-lived action/task that has discrete steps and that may eventually complete or fail
A trace is useful for e.g.:

- Logging how long time a particular action takes
- Logging different events that occurs while the user is performing a certain task (e.g. search)

A trace may complete or fail or never complete at all. Trace events are submitted continuously as they happen, at the
configured `flushInterval`

```typescript
import {defineTrace} from '@sanity/telemetry'

const ExampleTrace = defineTrace({
  name: 'Example Trace',
  version: 1,
})

type TraceData = {
  step: 'before-action' | 'after-action' | 'after-other'
}
const trace = logger.trace<TraceData>(ExampleTrace)

// mark the beginning of the trace
trace.start()

try {
  trace.log({step: 'before-action'})
  await performSomeAction()
  trace.log({step: 'after-action'})
  await doSomeOtherAction()
  trace.log({step: 'after-other'})
  trace.complete()
} catch (error) {
  // mark the trace as failed
  trace.error(error)
}
```

### Trace promise helper

As an alternative, you can also use the `await` helper to automatically mark the trace as completed or failed when
the promise resolves or rejects:

```typescript
async function performSomeAction() {
  //…
}
const trace = logger.trace(exampleTrace)
const res = trace.await(performSomeAction())
```

This will return the same promise as `performSomeAction()`, but the trace will be marked as completed or failed when the promise resolves or rejects. It will call trace.start() immediately, and will log the value the promise resolves to, or the error it rejects with. To specify a custom data to log, pass it as the second argument:

```typescript
trace.await(performSomeAction(), {
  foo: 'this will be logged when the action completes',
})
```

### Trace contexts

When logging events from an application, it can be useful to know more about the context of which a particular method or component has been called. Usually, an application comprises re-usable functions and components that's called from several entry points. For example, a `login()` helper function that logs in the current user may be invoked by both the `query` command and the `init` command. The `login()` function should remain agnostic about who invoked it, and be able to log telemetry events without having to attach this contextual information. To help with this, trace.newContext() returns a new `TelemetryLogger` interface that encapsulates this information to the event data that gets logged. This TelemetryLogger instance can then be passed on as the telemetry logger to the `login()` method, and in effect make the contextual information completely transparent for the `login()` method.

```ts
// query command

// create a trace for login
const trace = telemetry.trace(QueryCommand)

if (!loggedIn) {
  await login({telemetry: trace.newContext('login')})
}
//…
```

```ts
// init command

// create a trace for login
const trace = telemetry.trace(InitCommand)

if (!loggedIn) {
  await login({telemetry: trace.newContext('login')})
}
//…
```

Now, the login() method only sees a telemetry value that implements `TelemetryLogger`, and doesn't need to know anything about its context. The `login()` helper itself may also branch out to other helpers, creating new contexts for functions re-used across the application.

## Configuration

The telemetry store needs a single point of configuration for the environment/runtime

### Browser

```typescript
import {createBatchedStore, createSessionId} from '@sanity/telemetry'

const sessionId = createSessionId()

const store = createBatchedStore(sessionId, {
  // submit any pending events every 30s
  flushInterval: 30000,

  // implement user consent resolving
  resolveConsent: () => {
    //…
  },

  // implement sending events to backend
  sendEvents: (events) => {
    //…
  },

  // opt into a different strategy for sending events when the browser close, reload or navigate away from the current page (optional)
  sendBeacon: (events) => {
    //…
  },
})

// This makes sure that the browser flushes any pending events before the user navigates away
// This should only be called once
// if you wish to unregister lifecycle listeners later on, (e.g. in a React hook's cleanup), you can do so by calling unregister()
const unregister = registerLifecycleEvents(store)
```

### React

```typescript jsx
import {createBatchedStore, createSessionId} from '@sanity/telemetry'

const sessionId = createSessionId()

const store = createBatchedStore(sessionId, {
  // submit any pending events every 30s
  flushInterval: 10000,

  // implement user consent resolving
  resolveConsent: () => {
    //…
  },

  // implement sending events to backend
  sendEvents: (events) => {
    //…
  },

  // opt into a different strategy for sending events when the browser close, reload or navigate away from the current page (recommended)
  sendBeacon: (events) => {
    //…
  },
})

// Wrap the app in a TelemetryProvider
// This will enable usage of the `useTelemetry()` hook for descendants
function Root() {
  return (
    <TelemetryProvider store={store}>
      <App />
    </TelemetryProvider>
  )
}

// Usage in a component
function App() {
  const telemetry = useTelemetry()
  const handleClick = useCallback(() => {
    // Call the `log` method to log a one-off event
    telemetry.log(SomeEvent, {foo: 'bar'})
  }, [])

  return (
    //…
    <button onClick={handleClick}>Click me</button>
  )
}
```

### Node.js/CLI

```typescript
import {createBatchedStore, createSessionId} from '@sanity/telemetry'

const sessionId = createSessionId()

const store = createBatchedStore(sessionId, {
  // submit any pending events every 30s
  flushInterval: 30000,

  // implement user consent resolving
  resolveConsent: () => {
    //…
  },

  // implement sending events to backend
  sendEvents: (events) => {
    //…
  },
})

// Make sure to send collected events before exiting the application
process.on('beforeExit', async () => telemetryStore.end())

// Start logging events
store.logger.log(ExampleEvent, {foo: 'bar'})
```

The store returns a `logger` object, that application code can use for logging telemetry events or traces by calling the `.log()` or `.trace()` methods
defined on it.
