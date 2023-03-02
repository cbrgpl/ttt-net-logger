import { ci } from '../../helpers/ci.js'

import { NetworkAPIDecorator } from './NetworkApiDecorator.js'
import { IBaseLog } from '../../types/log.js'

interface IModifiedResponse extends Response {
  _loggerMetaProp: {
    url: string;
    init?: RequestInit;
  };
}

export class FetchDecorator extends NetworkAPIDecorator {
  private fetch = window.fetch.bind( window )

  private arrayBuffer = window.Response.prototype.arrayBuffer
  private blob = window.Response.prototype.blob
  private formData = window.Response.prototype.json
  private json = window.Response.prototype.json
  private text = window.Response.prototype.text

  decorate(): void {
    ci.step( 'Fetch decorated', true )
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const decorator = this

    window.fetch = async function ( url: string, init: RequestInit | undefined ): Promise<Response> {
      ci.log( `${ init?.method || 'GET' } ${ url }` )
      const response: IModifiedResponse  = await decorator.fetch.call( window, url, init )
      response._loggerMetaProp = { url, init }

      if ( response.status === 204 || !response.headers.get( 'content-type' ) ) {
        decorator.onResponseReaded( response )
      }

      return response
    }

    window.Response.prototype.arrayBuffer = async function(): Promise<ArrayBuffer> {
      const data = await decorator.arrayBuffer.call( this )
      decorator.onResponseReaded( this, data )
      return data
    }
    window.Response.prototype.blob = async function(): Promise<Blob> {
      const data = await decorator.blob.call( this )
      decorator.onResponseReaded( this, data )
      return data
    }

    window.Response.prototype.formData = async function(): Promise<FormData> {
      const data = await decorator.formData.call( this )
      decorator.onResponseReaded( this, data )
      return data
    }

    window.Response.prototype.json = async function(): Promise<any> {
      const data = await decorator.json.call( this )
      decorator.onResponseReaded( this, data )
      return data
    }

    window.Response.prototype.text = async function(): Promise<string> {
      const data = await decorator.text.call( this )
      decorator.onResponseReaded( this, data )
      return data
    }
  }

  undecorate(): void {
    ci.step( 'Fetch undecorated', true )
    window.fetch = this.fetch
  }

  protected onResponseReaded( response: IModifiedResponse, data?: any ): void {
    const loggerMeta = response._loggerMetaProp
    const log =  this.getLog( loggerMeta.url, response, loggerMeta.init,  data )
    super.sendLog( log )
  }

  protected getLog( url: string, response: Response, init?: RequestInit, responseData?: any ): IBaseLog {
    const log: IBaseLog = {
      request: {
        method: init?.method || 'GET',
        url: url,
        mode: init?.mode,
        headers: init?.headers as Record<string, string>,
        body: init?.body,
      },

      response: {
        headers: this.getResponseHeaders( response.headers ),
        status: response.status,
        type: response.type,
        statusText: response.statusText,
        body: responseData,
      },

      userAgent: window.navigator.userAgent,
    }

    return log
  }

  private getResponseHeaders( responseHeaders: Headers ): Record<string, string> {
    const headers: Record<string, string> = {}
    responseHeaders.forEach( ( value: string, header: string ): void => { headers[ header ] = value } )
    return headers
  }
}
