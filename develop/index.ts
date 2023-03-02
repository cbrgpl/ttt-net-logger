/// <reference lib="dom" />
import './setupNodeFetch.js'
import { DeveloperLogger } from './logger.js'
import { FetchDecorator } from './../dist/index.js'

const logger = new DeveloperLogger( {} )
const decorator = new FetchDecorator()

logger.decorator = decorator
decorator.decorate()
;( async () => {
  const response = await window.fetch( 'http://localhost:5000' )
  console.log( response )
} )()

