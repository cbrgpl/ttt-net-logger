import { IInnerParams, IClientParams } from '../types/config.js'

import { validate } from './validate.js'
import { configValidation } from '../schemas/config.validation.js'

const getDefaultParams = (): IInnerParams => ( {
  enableConsole: false,
  ignore: null,
  sessionVar: 'ttt_logger_session',
} )

const mergeParams = ( params: IClientParams ): IInnerParams => {
  return Object.assign( getDefaultParams(), params )
}

export const getReadyToUseParams = ( params: IClientParams ): IInnerParams | never => {
  validate( 'Валидация входного конфига', params, configValidation )
  return mergeParams( params )
}
