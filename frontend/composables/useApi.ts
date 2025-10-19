export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string

  const fetchApi = async <T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: { message: string; code?: string } }> => {
    try {
      const response = await fetch(`${apiBase}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      const data = await response.json()
      return data
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Network error',
          code: 'NETWORK_ERROR',
        },
      }
    }
  }

  return {
    fetchApi,
  }
}
