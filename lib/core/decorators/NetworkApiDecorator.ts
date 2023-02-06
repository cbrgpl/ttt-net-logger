import { Logger } from './../Logger.js'
import { IBaseLog } from '../../types/log.js'

export abstract class NetworkAPIDecorator {
  private _logger: Logger

  set logger( logger: Logger ) {
    this._logger = logger
  }

  protected sendLog( log: IBaseLog | null ): void {
    if ( log !== null ) {
      this._logger.sendLog( log as IBaseLog )
    }
  }

  abstract decorate(): void;
  abstract undecorate(): void;
}
