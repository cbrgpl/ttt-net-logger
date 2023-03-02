global.window = {
  fetch: ( ...args ) => {
    return {
      args: args,
      status: 999,
      type: 'type',
      headers: {
        forEach( callback ) {
          const headers = [
            ['value1', 'header1'],
            ['value2', 'header2']
          ]

          for(const header of headers) {
            callback(...header)
          }
        },
        get(header) {
          return args?.[1]?.headers?.['Accept'] ?? args?.[1]?.headers?.['accept']
        }
      },
      statusText: 'statusText',
      body: {}
    }
  },
  Response: {
    prototype: {
      arrayBuffer: async () => {
        return new ArrayBuffer(1)
      },
      blob: async () => {
        return new Blob()
      },
      formData: async () => {
        return new FormData()
      },
      json: async () => {
        return {}
      },
      text: async () => {
        return ''
      }
    }
  },
  Request,
  navigator: {
    userAgent: 'mockUserAgent'
  }
}
