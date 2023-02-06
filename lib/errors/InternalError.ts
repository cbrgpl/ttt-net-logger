import { ALogableError } from './ALogableError.js'
import { ci } from './../helpers/ci.js'

export class InternalError extends ALogableError {
  constructor( message: string, stack: string ) {
    super( message )
    this.stack = stack
  }

  logSelf(): void {
    ci.error( 'Internal error!' )
    ci.emptyRow()
    ci.subError( this.message )
    ci.emptyRow()
    ci.subError( 'Call stack:' )

    const rectedStack = this.getRectContent( this.stack as string )
    ci.code( rectedStack )
  }
}
