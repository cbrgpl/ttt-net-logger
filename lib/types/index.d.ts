// Type definitions for ttt-network-logger 1.0.0
// Project: ttt-network-logger
// Definitions by: cbrgpl <https://github.com/cbrgpl/ttt-network-logger>

import { IInnerParams, IClientParams } from './config.js'
import { ISession } from './../core/SessionUuid.js'
import { IBaseLog } from './log.js'


export {
  IInnerParams,
  IClientParams,

  ISession,
  IBaseLog,
}

declare abstract class Logger {
  protected session: SessionUuid
  protected readonly params: IInnerParams

  protected silentFetch: typeof window.fetch

  constructor( params: IClientParams );

  set decorator( decorator: NetworkAPIDecorator );

  abstract sendLog( log: IBaseLog ): void
}

declare class SessionUuid {
  protected sessionVar: string
  protected session: ISession

  constructor( sessionVar: string );

  get uuid(): string;

  protected generateSession(): ISession;
  protected saveSession(): void;
}

declare abstract class NetworkAPIDecorator {
  protected sendLog( log: IBaseLog| null ): void;

  abstract decorate(): void
  abstract undecorate(): void;
}

declare class FetchDecorator extends NetworkAPIDecorator {
  decorate(): void;
  undecorate(): void;
}
