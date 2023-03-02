/// <reference lib="dom" />
import './setupNodeFetch.js'
import { DeveloperLogger } from './logger.js'
import { FetchDecorator } from './../dist/index.js'

const logger = new DeveloperLogger( {
  enableConsole: true,
  ignore: [ /ignore-url.com/, /ignore2-url.com/ ],
} )
const decorator = new FetchDecorator()

logger.decorator = decorator
decorator.decorate()

;( async () => {
  await window.fetch( 'http://localhost:5000/wwew' )
  await window.fetch( 'http://ignore-url.com' )
  await window.fetch( 'http://localhost:5000/doadkas2' )
  await window.fetch( 'http://ignore2-url.com' )
} )()

