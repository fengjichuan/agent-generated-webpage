const ROWS = [
  { region: 'Americas', revenue: '$4.2M', growth: '+12%', share: '38%' },
  { region: 'Europe', revenue: '$2.8M', growth: '+7%', share: '26%' },
  { region: 'Greater China', revenue: '$2.1M', growth: '+18%', share: '19%' },
  { region: 'Japan', revenue: '$0.9M', growth: '+4%', share: '8%' },
  { region: 'Rest of APAC', revenue: '$1.0M', growth: '+9%', share: '9%' },
]

export function DataTable() {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Region</th>
            <th>Revenue</th>
            <th>Growth</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.region}>
              <td>{r.region}</td>
              <td>{r.revenue}</td>
              <td className="data-table__growth">{r.growth}</td>
              <td>{r.share}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
