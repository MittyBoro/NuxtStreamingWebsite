export const $api = (path, options = {}) => {
  if (process.client && typeof Echo !== 'undefined') {
    if ('headers' in options) {
      options.headers['X-Socket-ID'] = Echo.socketId()
    } else {
      options.headers = {
        'X-Socket-ID': Echo.socketId(),
      }
    }
  }
  if (process.server) {
    options.baseURL =
      useRuntimeConfig().public.backendServerUrl || options.baseURL
  }
  return useNuxtApp().$sanctumClient(path, options)
}
