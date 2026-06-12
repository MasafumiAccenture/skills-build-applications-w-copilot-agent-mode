import { useEffect, useState } from 'react'

function Workouts({ apiHost }) {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${apiHost}/api/workouts/`)
      .then((response) => response.json())
      .then(setWorkouts)
      .catch((err) => setError(err.message))
  }, [apiHost])

  return (
    <section>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
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
            {workouts.map((workout) => (
              <tr key={workout._id}>
                <td>{workout.name}</td>
                <td>{workout.duration} min</td>
                <td>{workout.difficulty}</td>
                <td>{workout.focusArea}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Workouts
