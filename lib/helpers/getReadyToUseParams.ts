import { IInnerParams, IClientParams } from '../types/config.js'

const getDefaultParams = (): IInnerParams => ( {
  enableConsole: false,
  ignore: null,
  sessionVar: 'ttt_logger_session',
} )

const mergeParams = ( params: IClientParams ): IInnerParams => {
  return Object.assign( getDefaultParams(), params )
}

export const getReadyToUseParams = ( params: IClientParams ): IInnerParams | never => {
  return mergeParams( params )
}
