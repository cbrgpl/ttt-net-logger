import { Logger, IBaseLog } from './../dist/index.js'

export class DeveloperLogger extends Logger {
  async sendLog( log: IBaseLog ): Promise<void> {
    await super.silentFetch( 'https://logger-api.2pp.dev/api/logger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( log ),
    } )

  }
}
