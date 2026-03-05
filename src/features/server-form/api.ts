export async function testApi(api: string, signal?: AbortSignal) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    // api is the full URL from form input
    const response = await fetch(api, {
      method: 'HEAD',
      signal: signal || controller.signal,
    })
    
    clearTimeout(timeoutId)
    return response.ok
  } catch {
    return false
  }
}
