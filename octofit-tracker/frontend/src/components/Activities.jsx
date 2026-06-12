import { useEffect, useState } from 'react'

function Activities({ apiHost }) {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${apiHost}/api/activities/`)
      .then((response) => response.json())
      .then(setActivities)
      .catch((err) => setError(err.message))
  }, [apiHost])

  return (
    <section>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
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
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.user?.name || activity.userId || 'Unknown'}</td>
                <td>{activity.type}</td>
                <td>{activity.duration} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{new Date(activity.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
