import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config/apiBaseUrl'
import { normalizeCollectionResponse } from '../utils/normalizeCollectionResponse'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/teams/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setTeams(normalizeCollectionResponse(data))
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <div className="container py-4">
      <h2 className="h3 mb-3">Teams</h2>

      {loading && <p className="text-secondary">Loading teams...</p>}

      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-info">No teams found.</div>
      )}

      {!loading && !error && teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Team</th>
                <th scope="col">City</th>
                <th scope="col">Captain</th>
                <th scope="col">Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td>{team.name}</td>
                  <td>{team.city}</td>
                  <td>{team.captain}</td>
                  <td>{Array.isArray(team.members) ? team.members.join(', ') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Teams
