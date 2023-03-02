# ttt-net-logger

The library provides a set of tools that will allow you to start logging requests made with the client. The library provides decorators for the basic API (Fetch API), but if necessary you can implement your own decorator.

You should create your own implementation of the Logger class because of the flexibility.

# Getting Started

```bash
npm install ttt-net-logger
```

# Usage 

**session.ts**
```ts
import { SessionUuid, ISession } from 'ttt-net-logger'

interface CRMSession extends ISession {
  expiryAt: number;
}

export class UrOwnSessionUuid extends SessionUuid {
  protected generateSession(): CRMSession {
    // Your own implementation
  }

  protected saveSession(): void {
    // Your own implementation
  }
}
```

**logger.ts**
```ts
import { Logger, IBaseLog, IClientParams } from 'ttt-net-logger'
import { UrOwnSessionUuid } from './session'

class UrOwnParticular extends Logger {
    declare protected session: CRMSessionUuid

    async sendLog( log: IBaseLog ): Promise<void> {
    // Allows you to send a request that will not be logged
    await super.silentFetch( 'localhost:5500/logger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( crmLog ),
    } )

  }
}
```

# Config

Parameters that are passed to the construct Logger.

```ts
type IClientParams = {
    enableConsole?: boolean;
    ignore?: RegExp[];
    sessionVar?: string;
}
```

| Property      | Description                                                                                  |
| ----------    | -------------------------------------------------------------------------------------------- |
| enableConsole | Allows you to turn on/off the output of the console log[^console_log]                        |
| ignore        | List of regular expressions for URLs that do not need to be logged                           |
| sessionVar    | Name of variable in sessionStorage                                                           |

# API

### IBaseLog

```ts
export interface IBaseLog {
  request: IRequest;
  response: IResponse;
  userAgent: string;
}

interface IRequest {
  method: string;
  url: string;
  mode?: RequestMode;
  headers?: Record<string, string>;
  body?: any;
}

interface IResponse {
  headers: Record<string, string>;
  body?: any;
  type: ResponseType;
  statusText: string;
  status: number;
}
```

### IClientParams

```ts
type IClientParams = {
    project?: string | undefined;
    enableConsole?: boolean | undefined;
    ignore?: string[] | undefined;
    sessionVar?: string | undefined;
}
```

### SessionUuid && ISession

```ts
export interface ISession {
  uuid: string;
}
```

#### **SessionUuid**

The class is used to generate the current session.

**Interface:**

```ts
protected sessionVar: string;
```
The name of the variable in Session Storage. Used to avoid collisions with other variables.

-----

```ts
protected session: ISession;
```
This active session.

-----

```ts
constructor( sessionVar: string );
```

-----

```ts
get uuid(): string;
```
Getting the current uuid. By default, it is implemented as a singleton - if there is no session in Sesion Storage, it creates a new one, otherwise takes the value from storage.

-----

```ts
protected generateSession(): ISession;
```
New session generation function.

-----

```ts
protected saveSession(): void
```
Session saver. By default saves in Session Storage.

####**NetworkAPIDecorator**

```ts
abstract class NetworkAPIDecorator
```

The class is used as a basis for creating decorators for various IPAs. It is the decorator who tells the logger when and what to log.

For example, see [FetchDecorator] (./.../lib/core/decorators/FetchDecorator.ts)

**Interface:**

```ts
set logger(logger: Logger)
```
Binds a copy of the logger to the decorator.

-----

```ts
protected sendLog( log: IBaseLog | null ): void
```
A method for sending a log to a server.

-----

```ts
abstract decorate(): void;
abstract undecorate(): void;
```
The methods allow to realize the process of integration of the decorator and its removal.

#### **Logger**

```ts
abstract class Logger
```

The class of logger. Is an abstract class, accordingly it is necessary to write an implementation on the basis of it.

**Interface:**

```ts
protected session: SessionUuid
```
Session controller. Allows you to redefine the controller with your own.

-----

```ts
protected only params: IInnerParams
```
Parameters that were passed when logger was initialized

```ts
constructor( params: IClientParams )
```

-----

```ts
set decorator( decorator: NetworkAPIDecorator )
```
Allows you to change the current active decorator

-----

```ts
protected silentFetch( input: RequestInfo | URL, init?: RequestInit | undefined )
```
Allows you to query a server without logging.

-----

```ts
abstract sendLog( log: IBaseLog ): void
```
The abstract method you need to implement to send the log to the server.

[^console_log]: Format - *HH:MM:SS:MS METHOD URL*

