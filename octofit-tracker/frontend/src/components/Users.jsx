import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config/apiBaseUrl'
import { normalizeCollectionResponse } from '../utils/normalizeCollectionResponse'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/users/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setUsers(normalizeCollectionResponse(data))
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <div className="container py-4">
      <h2 className="h3 mb-3">Users</h2>

      {loading && <p className="text-secondary">Loading users...</p>}

      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className="alert alert-info">No users found.</div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Level</th>
                <th scope="col">Goals</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.level}</td>
                  <td>{Array.isArray(user.goals) ? user.goals.join(', ') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Users
