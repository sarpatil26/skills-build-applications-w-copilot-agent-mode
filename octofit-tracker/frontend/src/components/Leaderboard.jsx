import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config/apiBaseUrl'
import { normalizeCollectionResponse } from '../utils/normalizeCollectionResponse'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/leaderboard/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setEntries(normalizeCollectionResponse(data))
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <div className="container py-4">
      <h2 className="h3 mb-3">Leaderboard</h2>

      {loading && <p className="text-secondary">Loading leaderboard...</p>}

      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && entries.length === 0 && (
        <div className="alert alert-info">No leaderboard entries found.</div>
      )}

      {!loading && !error && entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.rank}</td>
                  <td>{entry.userEmail}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
