export const configValidation = {
  '$schema': 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    project: {
      type: 'string',
    },
    enableConsole: {
      type: 'boolean',
    },
    sessionVar: {
      type: 'string',
    },
    ignore: {
      type: 'array',
      items: { type: 'string' },
    },
  },
}
