interface IParams {
  enableConsole: boolean;
  sessionVar: string;
  ignore: string[];
}

type ToNullable<T extends object> = {
  [Property in keyof T]: T[Property] | null
}

type ClientProps = 'enableConsole' | 'ignore' | 'sessionVar'
export type IClientParams = Partial<Pick<IParams, ClientProps>>

type NullableProps = 'ignore'
type NullableIClientParams = ToNullable<Pick<IParams, NullableProps>>
type NotNullableIClientParams = Omit<IParams, NullableProps>
export type IInnerParams = NullableIClientParams & NotNullableIClientParams
