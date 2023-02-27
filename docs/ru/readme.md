# ttt-net-logger

Библиотека предоставляет набор утилит, которые позволят вам начать логгировать запросы, совершаемые с клиента. Библиотека поставляет декораторы для базовых АПИ (Fetch API), но при необходимости вы можете реализовать свой собственный декоратор.

Вы должны создавать свою собственную реализацию класса Logger по причине гибкости.

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
    // Ваша собственная реализация
  }

  protected saveSession(): void {
    // Ваша собственная реализация
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
    // Позволяет отправить запрос, который не будет логгироваться
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

Параметры, которые передаются в конструктое Logger.

```ts
type IClientParams = {
    enableConsole?: boolean | undefined;
    ignore?: string[] | undefined;
    sessionVar?: string | undefined;
}
```

| Property  | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| enableConsole | Позволяет включать/выключать вывод консольного лога[^консольный_лог] |
| ignore | Список URL адресов, которые не нужно логгировать                            |
| sessionVar | Название переменной в sessionStorage                                    |

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

Класс используется для генерации текущей сессии.

**Интерфейс:**

```ts
protected sessionVar: string;
```
Название переменной в Session Storage. Используется для избежания коллизий с другими переменными.

-----

```ts
protected session: ISession;
```
Текущая активная сессия.

-----

```ts
constructor( sessionVar: string );
```

-----

```ts
get uuid(): string;
```
Получение текущего uuid. По умолчанию реализуется как синглтон - если в Sesion Storage нет сессии, то создает новую, иначе берет значение из storage.

-----

```ts
protected generateSession(): ISession;
```
Функция генерации новой сессии.

-----

```ts
protected saveSession(): void
```
Функция сохранения сессии. По умолчанию сохраняет в Session Storage.

#### **NetworkAPIDecorator**

```ts
abstract class NetworkAPIDecorator
```

Класс используется как основа создания декораторов для различных АПИ. Именно декоратор говорит логгеру, когда и что логгировать.

Для примера использования можно посмотреть в [FetchDecorator](./../../lib/core/decorators/FetchDecorator.ts)

**Интерфейс:**

```ts
set logger(logger: Logger)
```
Привязывает экземпляр логгера к декоратору.

-----

```ts
protected sendLog( log: IBaseLog | null ): void
```
Метод для совершения отправки лога на сервер.

-----

```ts
abstract decorate(): void;
abstract undecorate(): void;
```
Методы позволяют реализовать процесс интеграции декоратора и его удаления.

#### **Logger**

```ts
abstract class Logger
```

Класс логгера. Является абстрактным классом, соответственно на основе него нужно писать реализацию.

**Интерфейс:**

```ts
protected session: SessionUuid
```
Контроллер сессии. Позволяет переопределить контроллер своим собственным.

-----

```ts
protected readonly params: IInnerParams
```
Параметры, которые были переданы при инициализации логгера

```ts
constructor( params: IClientParams )
```

-----

```ts
set decorator( decorator: NetworkAPIDecorator )
```
Позволяет изменить текущий активный декоратор

-----

```ts
protected silentFetch( input: RequestInfo | URL, init?: RequestInit | undefined )
```
Позволяет выполнить запрос на сервер в обход логгирования.

-----

```ts
abstract sendLog( log: IBaseLog ): void
```
Абстрактный метод, который необходимо реализовать для выполнения отправки лога на сервер.

[^консольный_лог]: Формат - *HH:MM:SS:MS METHOD URL*

