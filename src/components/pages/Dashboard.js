function Dashboard() {
  const summaryCards = [
    { label: 'Today\'s Income', value: '₱10,699.69', accent: 'blue' },
    { label: 'Today\'s Earnings', value: '₱5,599.69', accent: 'blue' },
    { label: 'Products', value: '100', accent: 'blue' },
    { label: 'Categories', value: '16', accent: 'blue' },
    { label: 'Users', value: '4', accent: 'blue' },
  ];

  const purchaseData = [
    ['T-shirt', '5', '2023-01', '₱500'],
    ['Jacket', '5', '2023-01', '₱750'],
    ['Short', '5', '2023-01', '₱500'],
    ['Bag', '1', '2023-01', '₱850'],
  ];

  const salesData = [
    ['Top', 'T-shirt', '100', '50'],
    ['Top', 'Jacket', '100', '30'],
    ['Bottom', 'Short', '100', '20'],
    ['Bottom', 'Pants', '50', '5'],
  ];

  const newProducts = ['T-shirt', 'Jacket', 'Shorts', 'Shoes', 'Cap'];

  const chartData = [
    { label: 'Jan', income: 90, sales: 40, revenue: 60, tax: 30 },
    { label: 'Feb', income: 110, sales: 50, revenue: 70, tax: 35 },
    { label: 'Mar', income: 120, sales: 58, revenue: 80, tax: 38 },
    { label: 'Apr', income: 130, sales: 62, revenue: 90, tax: 42 },
    { label: 'May', income: 150, sales: 70, revenue: 100, tax: 48 },
    { label: 'Jun', income: 160, sales: 82, revenue: 110, tax: 52 },
    { label: 'Jul', income: 170, sales: 88, revenue: 120, tax: 58 },
    { label: 'Aug', income: 180, sales: 90, revenue: 130, tax: 60 },
    { label: 'Sep', income: 190, sales: 95, revenue: 140, tax: 64 },
    { label: 'Oct', income: 170, sales: 85, revenue: 125, tax: 60 },
    { label: 'Nov', income: 175, sales: 88, revenue: 130, tax: 65 },
    { label: 'Dec', income: 200, sales: 100, revenue: 145, tax: 72 },
  ];

  const yTicks = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-bar">
          <div className="welcome-text">WELCOME TO DASHBOARD !</div>
          <div className="admin-pill">AD</div>
        </div>
      </header>

      <section className="stats-grid">
        {summaryCards.map((card) => (
          <div className={`stat-card ${card.accent}`} key={card.label}>
            <div className="stat-label">{card.label}</div>
            <div className="stat-value">{card.value}</div>
          </div>
        ))}
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <span>Latest Purchased Products</span>
            <a href="/">View All</a>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product name</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {purchaseData.map(([name, qty, date, total]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{qty}</td>
                  <td>{date}</td>
                  <td>{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span>Highest Selling Products</span>
            <a href="/">View All</a>
          </div>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Type</th>
                <th>Total Stocks</th>
                <th>Total Sold</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map(([category, type, stock, sold]) => (
                <tr key={`${category}-${type}`}>
                  <td>{category}</td>
                  <td>{type}</td>
                  <td>{stock}</td>
                  <td>{sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span>New Added Products</span>
            <a href="/">View All</a>
          </div>
          <ul className="product-list">
            {newProducts.map((product) => (
              <li key={product}>
                <span>{product}</span>
                <span className="product-tag">Tops</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chart-panel">
        <div className="chart-header">
          <div className="chart-title-wrap">
            <span className="chart-check" aria-hidden="true" />
            <h3>Financial Overview</h3>
          </div>

          <div className="chart-tabs">
            <button className="tab active">Day</button>
            <button className="tab">Week</button>
            <button className="tab">Month</button>
            <button className="tab">Annual</button>
          </div>

          <div className="chart-legend">
            <span><i className="legend blue" />Income</span>
            <span><i className="legend green" />Sales</span>
            <span><i className="legend yellow" />Revenue</span>
            <span><i className="legend red" />Tax</span>
          </div>
        </div>

        <div className="chart-box">
          <svg viewBox="0 0 780 260" preserveAspectRatio="none" className="chart-svg">
            {[...Array(8)].map((_, index) => (
              <line
                key={`grid-${index}`}
                x1="50"
                x2="760"
                y1={30 + index * 26}
                y2={30 + index * 26}
                stroke="#d9dfe8"
                strokeWidth="1"
              />
            ))}

            <line x1="50" y1="20" x2="50" y2="220" stroke="#b8c0cc" strokeWidth="1" />
            <line x1="50" y1="220" x2="760" y2="220" stroke="#b8c0cc" strokeWidth="1" />

            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <text key={item} x="14" y={218 - item * 20} fontSize="11" fill="#798399">
                {yTicks[item]}
              </text>
            ))}

            {chartData.map((point, index) => (
              <text key={point.label} x={96 + index * 58} y="240" fontSize="11" fill="#798399">
                {point.label}
              </text>
            ))}

            <polyline
              fill="none"
              stroke="#3d72ff"
              strokeWidth="3"
              points="96,140 154,132 212,120 270,118 328,106 386,100 444,96 502,78 560,72 618,82 676,75 734,66"
            />
            <polyline
              fill="none"
              stroke="#32c39f"
              strokeWidth="3"
              points="96,152 154,146 212,138 270,128 328,118 386,92 444,90 502,84 560,80 618,75 676,72 734,70"
            />
            <polyline
              fill="none"
              stroke="#f0c04f"
              strokeWidth="3"
              points="96,168 154,165 212,160 270,154 328,145 386,138 444,132 502,120 560,110 618,103 676,100 734,92"
            />
            <polyline
              fill="none"
              stroke="#d95f4c"
              strokeWidth="3"
              points="96,206 154,200 212,196 270,188 328,180 386,172 444,170 502,164 560,157 618,152 676,148 734,142"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
