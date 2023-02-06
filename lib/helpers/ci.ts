/* eslint-disable no-console */
import timestamp from 'time-stamp'
import chalk from 'chalk'

type FormattingTypes =  'bg' | 'step' | 'log' | 'error' | 'subError' | 'sucess'

export const formatting: Record<FormattingTypes, ( text: string ) => string> = {
  step: ( text: string ): string => chalk.bold.blueBright.italic( text ),
  log: ( text: string ): string => chalk.italic.gray( text ),
  error: ( text: string ): string => chalk.bold.red( text ),
  subError: ( text: string ): string => chalk.italic.red( text ),
  bg: ( text: string ): string => text,
  sucess: ( text: string ): string => chalk.bold.green( text ),
}

export class CI {
  enabled = true

  step( summary: string ) {
    this.timestampLog( formatting.step( summary ) )
  }

  log( summary: string ) {
    this.timestampLog( formatting.log( summary ) )
  }

  error( summary: string ) {
    this.timestampLog( formatting.error( summary ) )
  }

  subError( summary: string ) {
    this.offsetLog( formatting.subError( summary ) )
  }

  code( summary: string ) {
    this.offsetLog( formatting.bg( summary ) )
  }

  finish( summary: string ) {
    this.timestampLog( formatting.sucess( summary ) )
  }

  emptyRow(): void {
    console.log()
  }

  private timestampLog( text: string ): void {
    console.log( `${ timestamp.utc( 'HH:mm:ss:ms' ) } ${ text }` )
  }

  private offsetLog( text?: string ): void {
    const paddingLeft = ' '.repeat( 13 )
    console.log( text ? text.split( '\n' ).map( row => paddingLeft + row ).join( '\n' ) : '' )
  }
}

export const ci = new CI()
