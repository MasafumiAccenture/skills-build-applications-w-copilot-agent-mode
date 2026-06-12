import { useEffect, useState } from 'react'

function Leaderboard({ apiHost }) {
  const [scores, setScores] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${apiHost}/api/leaderboard/`)
      .then((response) => response.json())
      .then(setScores)
      .catch((err) => setError(err.message))
  }, [apiHost])

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Weekly Points</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.rank}</td>
                <td>{entry.user?.name || 'Unknown'}</td>
                <td>{entry.score}</td>
                <td>{entry.weeklyPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
