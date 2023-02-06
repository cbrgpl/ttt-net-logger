import { ALogableError } from './ALogableError.js'
import { highlight } from 'cli-highlight'

export class ParseError extends ALogableError {
  private content: string
  private language: string
  private filename?: string

  constructor( content: string, language: string, message: string, filename?: string ) {
    super( message )

    this.content = content
    this.language = language
    this.filename = filename
    this.message = message
  }

  get title(): string {
    return `Parse error was captured due to handling ${ this.filename ? this.filename + ' ' : '' }content`
  }

  private get subtitle(): string {
    return 'Target content of process:'
  }

  logSelf(): void {
    ALogableError.ci.error( this.title )
    ALogableError.ci.subError( this.message )
    ALogableError.ci.emptyRow()
    ALogableError.ci.subError( this.subtitle )
    const rected = this.getRectContent( this.content )
    ALogableError.ci.code( highlight( rected, { language: this.language } ) )
  }
}
