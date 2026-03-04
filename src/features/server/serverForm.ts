export async function testApi(api: string, signal?: AbortSignal) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch(`https://${api}/status.json`, {
      method: 'HEAD',
      signal: signal || controller.signal,
    })
    
    clearTimeout(timeoutId)
    return response.ok
  } catch {
    return false
  }
}
