import { ci } from './../helpers/ci.js'

import { SessionUuid } from './SessionUuid.js'

import { IInnerParams, IClientParams } from './../types/config.js'
import { getReadyToUseParams } from './../helpers/getReadyToUseParams.js'

import { IBaseLog } from '../types/log.js'
import { NetworkAPIDecorator } from './decorators/NetworkApiDecorator.js'

export abstract class Logger {
  protected session: SessionUuid

  protected readonly params: IInnerParams
  private _decorator: NetworkAPIDecorator
  private fetch = window.fetch

  constructor( params: IClientParams ) {
    this.params = getReadyToUseParams( params )
    this.session = new SessionUuid( this.params.sessionVar )

    ci.step( 'Logger initialized' )
    ci.enabled = this.params.enableConsole
  }

  set decorator( decorator: NetworkAPIDecorator ) {
    if ( this._decorator ) {
      this._decorator.undecorate()
    }

    decorator.logger = this
    this._decorator = decorator
  }

  protected silentFetch( input: RequestInfo | URL, init?: RequestInit | undefined ): Promise<Response> {
    return this.fetch.call( window, input, init )
  }

  abstract sendLog( log: IBaseLog ): void
}
