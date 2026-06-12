import { useEffect, useState } from 'react'

const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload?.data && Array.isArray(payload.data)) return payload.data
  if (payload?.results && Array.isArray(payload.results)) return payload.results
  if (payload?.items && Array.isArray(payload.items)) return payload.items
  return []
}

function Activities({ apiBase }) {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    fetch(`${apiBase}/activities/`)
      .then((response) => {
        if (!response.ok) throw new Error(`API returned ${response.status}`)
        return response.json()
      })
      .then((data) => setActivities(normalizeResponse(data)))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : activities.length === 0 ? (
        <p className="text-muted">No activities found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity._id || activity.id || `${activity.userId}-${activity.date}-${index}`}>
                  <td>{activity.user?.name || activity.userId || 'Unknown'}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration ? `${activity.duration} min` : '-'}</td>
                  <td>{activity.caloriesBurned ?? '-'}</td>
                  <td>{activity.date ? new Date(activity.date).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
