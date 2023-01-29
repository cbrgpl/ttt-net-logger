#!/usr/bin/env node
import { cli } from './helpers/cli.js'
import { CI } from './helpers/CI.js'

import { InternalError } from './errors/InternalError.js'
import { ALogableError } from './errors/ALogableError.js'

import { JSON } from './helpers/JSON.js'

( async (): Promise<void> => {
  try {
    const args = cli.getCliArgs()
    CI.step( JSON.stringify( args ) )

    CI.finish( 'Finish' )
    process.exit( 0 )
  } catch ( err ) {
    if ( err instanceof ALogableError ) {
      CI.error( err )
    } else {
      CI.error( new InternalError( err.message, err.stack ) )
    }

    process.exit( 1 )
  }
} )()
