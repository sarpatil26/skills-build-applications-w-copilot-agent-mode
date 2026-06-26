import { useEffect, useState } from 'react'
import { normalizeCollectionResponse } from '../utils/normalizeCollectionResponse'

function Workouts() {
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(apiEndpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setWorkouts(normalizeCollectionResponse(data))
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <div className="container py-4">
      <h2 className="h3 mb-3">Workouts</h2>

      {loading && <p className="text-secondary">Loading workouts...</p>}

      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-info">No workouts found.</div>
      )}

      {!loading && !error && workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Intensity</th>
                <th scope="col">Duration</th>
                <th scope="col">Focus Area</th>
                <th scope="col">Equipment</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id}>
                  <td>{workout.title}</td>
                  <td>{workout.intensity}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.focusArea}</td>
                  <td>{Array.isArray(workout.equipment) ? workout.equipment.join(', ') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Workouts
