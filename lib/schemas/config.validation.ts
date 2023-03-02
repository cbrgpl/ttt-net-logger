export const configValidation = {
  '$schema': 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    enableConsole: {
      type: 'boolean',
    },
    sessionVar: {
      type: 'string',
    },
    ignore: {
      type: 'array',
    },
  },
}
