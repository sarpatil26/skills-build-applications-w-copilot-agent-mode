const CANDIDATE_KEYS = ['items', 'data', 'results', 'docs', 'records']

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  for (const key of CANDIDATE_KEYS) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  for (const value of Object.values(payload)) {
    if (Array.isArray(value)) {
      return value
    }
  }

  return []
}
