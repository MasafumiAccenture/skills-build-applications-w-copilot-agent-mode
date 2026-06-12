import { useEffect, useState } from 'react'

const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload?.data && Array.isArray(payload.data)) return payload.data
  if (payload?.results && Array.isArray(payload.results)) return payload.results
  if (payload?.items && Array.isArray(payload.items)) return payload.items
  return []
}

function Workouts({ apiBase }) {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    fetch(`${apiBase}/workouts/`)
      .then((response) => {
        if (!response.ok) throw new Error(`API returned ${response.status}`)
        return response.json()
      })
      .then((data) => setWorkouts(normalizeResponse(data)))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : workouts.length === 0 ? (
        <p className="text-muted">No workouts found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Duration</th>
                <th>Difficulty</th>
                <th>Focus Area</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout._id || workout.id || workout.name || index}>
                  <td>{workout.name || '-'}</td>
                  <td>{workout.duration ? `${workout.duration} min` : '-'}</td>
                  <td>{workout.difficulty || '-'}</td>
                  <td>{workout.focusArea || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Workouts
