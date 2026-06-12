import { useEffect, useState } from 'react'

const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload?.data && Array.isArray(payload.data)) return payload.data
  if (payload?.results && Array.isArray(payload.results)) return payload.results
  if (payload?.items && Array.isArray(payload.items)) return payload.items
  return []
}

function Leaderboard({ apiBase }) {
  const [scores, setScores] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    fetch(`${apiBase}/leaderboard/`)
      .then((response) => {
        if (!response.ok) throw new Error(`API returned ${response.status}`)
        return response.json()
      })
      .then((data) => setScores(normalizeResponse(data)))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : scores.length === 0 ? (
        <p className="text-muted">No leaderboard entries found.</p>
      ) : (
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
              {scores.map((entry, index) => (
                <tr key={entry._id || entry.id || entry.rank || index}>
                  <td>{entry.rank ?? '-'}</td>
                  <td>{entry.user?.name || 'Unknown'}</td>
                  <td>{entry.score ?? '-'}</td>
                  <td>{entry.weeklyPoints ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
