interface IParams {
  project: string;
  enableConsole: boolean;
  sessionVar: string;
  ignore: string[];
}

type ToNullable<T extends object> = {
  [Property in keyof T]: T[Property] | null
}

type ClientProps = 'project' | 'enableConsole' | 'ignore' | 'sessionVar'
export type IClientParams = Partial<Pick<IParams, ClientProps>>

type NullableProps = 'project' | 'ignore'
type NullableIClientParams = ToNullable<Pick<IParams, NullableProps>>
type NotNullableIClientParams = Omit<IParams, NullableProps>
export type IInnerParams = NullableIClientParams & NotNullableIClientParams
