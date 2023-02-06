import { ALogableError } from './ALogableError.js'
import { highlight } from 'cli-highlight'
import { ErrorObject } from 'ajv'

export class ValidationError extends ALogableError {
  private target: string
  private validations: ErrorObject[]

  constructor( target: string, validation: ErrorObject[] ) {
    super()

    this.target = target
    this.validations = validation
  }

  logSelf() {
    ALogableError.ci.error( 'Validations were not passed' )
    ALogableError.ci.subError( `Target "${ this.target }"` )
    ALogableError.ci.emptyRow()
    ALogableError.ci.subError( 'Errors list:' )
    ALogableError.ci.emptyRow()

    let validationCounter = 0
    for ( const validation of this.validations ) {
      if ( this.validations.length !== 1 ) {
        ALogableError.ci.subError( `Error ${ validationCounter++ }` )
      }
      const rected = this.getRectContent( JSON.stringify( validation, null, 2 ) )
      ALogableError.ci.code( highlight( rected, { language: 'json' } ) )
      ALogableError.ci.emptyRow()
    }
  }
}
