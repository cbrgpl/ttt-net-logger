import { Logger } from './../Logger.js'
import { IBaseLog } from '../../types/log.js'
import { ci } from '../../helpers/ci.js'

export abstract class NetworkAPIDecorator {
  private _ignore: RegExp[] | null
  private _logger: Logger

  set logger( logger: Logger ) {
    this._logger = logger
  }

  set ignore( ignore: RegExp[] | null ) {
    this._ignore = ignore
  }

  protected sendLog( log: IBaseLog | null ): void {
    if ( log === null || this.isUrlIgnored( log?.request.url ) ) {

      if ( log ) {
        ci.log( `Url ${ log.request.url } is ignored` )
      }

      return
    }

    this._logger.sendLog( log as IBaseLog )
  }

  private isUrlIgnored( url: string ): boolean {
    if ( this._ignore === null ) {
      return false
    }

    let ignoreInstance: RegExp
    for ( ignoreInstance of this._ignore ) {
      if ( ignoreInstance.test( url ) ) {
        return true
      }
    }

    return false
  }

  abstract decorate(): void;
  abstract undecorate(): void;
}
