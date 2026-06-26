import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config/apiBaseUrl'
import { normalizeCollectionResponse } from '../utils/normalizeCollectionResponse'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/activities/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setActivities(normalizeCollectionResponse(data))
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <div className="container py-4">
      <h2 className="h3 mb-3">Recent Activities</h2>

      {loading && <p className="text-secondary">Loading activities...</p>}

      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-info">No activities found.</div>
      )}

      {!loading && !error && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">User</th>
                <th scope="col">Duration</th>
                <th scope="col">Calories</th>
                <th scope="col">Completed</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.type}</td>
                  <td>{activity.userEmail}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{new Date(activity.completedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Activities
