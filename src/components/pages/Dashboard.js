
import productData from "../../data/product.json";
import "../../assets/css/Dashboard.css";

function Dashboard() {
  // Safely retrieve dashboard datasets from product.json
  const summaryCards = Array.isArray(productData.summaryCards)
    ? productData.summaryCards
    : [];

  const purchaseData = Array.isArray(productData.purchaseData)
    ? productData.purchaseData
    : [];

  const salesData = Array.isArray(productData.salesData)
    ? productData.salesData
    : [];

  const newProducts = Array.isArray(productData.newProducts)
    ? productData.newProducts
    : [];

  const chartData = Array.isArray(productData.chartData)
    ? productData.chartData
    : [];

  const yTicks = Array.isArray(productData.yTicks)
    ? productData.yTicks
    : [];

  // Chart configuration
  const chartWidth = 780;
  const chartHeight = 260;
  const chartStartX = 96;
  const chartEndX = 734;
  const chartStartY = 30;
  const chartEndY = 210;

  const chartSeries = [
    { key: "income", color: "#3d72ff" },
    { key: "sales", color: "#32c39f" },
    { key: "revenue", color: "#f0c04f" },
    { key: "tax", color: "#d95f4c" },
  ];

  // Calculate maximum chart value
  const maxValue = Math.max(
    ...chartData.flatMap((point) =>
      chartSeries.map((series) =>
        Number(point?.[series.key] || 0)
      )
    ),
    1
  );

  // Generate chart points
  const getChartPoints = (key) =>
    chartData
      .map((point, index) => {
        const x =
          chartData.length > 1
            ? chartStartX +
              (index * (chartEndX - chartStartX)) /
                (chartData.length - 1)
            : chartStartX;

        const value = Number(point?.[key] || 0);

        const y =
          chartEndY -
          (value / maxValue) * (chartEndY - chartStartY);

        return `${x},${y}`;
      })
      .join(" ");

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-bar">
          <div className="welcome-text">
            WELCOME TO DASHBOARD !
          </div>

          <div className="admin-pill">AD</div>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="stats-grid">
        {summaryCards.map((card, index) => (
          <div
            className={`stat-card ${card?.accent || "blue"}`}
            key={card?.label || index}
          >
            <div className="stat-label">
              {card?.label || "N/A"}
            </div>

            <div className="stat-value">
              {card?.value ?? 0}
            </div>
          </div>
        ))}
      </section>

      {/* Dashboard Tables */}
      <section className="content-grid">

        {/* Latest Purchased Products */}
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
              {purchaseData.length > 0 ? (
                purchaseData.map((item, index) => (
                  <tr key={`${item?.name || "purchase"}-${index}`}>
                    <td>{item?.name ?? "N/A"}</td>
                    <td>{item?.qty ?? 0}</td>
                    <td>{item?.date ?? "N/A"}</td>
                    <td>{item?.total ?? "₱0.00"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    No purchase records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Highest Selling Products */}
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
              {salesData.length > 0 ? (
                salesData.map((item, index) => (
                  <tr
                    key={`${item?.category || "sales"}-${item?.type || index}`}
                  >
                    <td>{item?.category ?? "N/A"}</td>
                    <td>{item?.type ?? "N/A"}</td>
                    <td>{item?.stock ?? 0}</td>
                    <td>{item?.sold ?? 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    No sales records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* New Added Products */}
        <div className="panel">
          <div className="panel-header">
            <span>New Added Products</span>
            <a href="/">View All</a>
          </div>

          <ul className="product-list">
            {newProducts.length > 0 ? (
              newProducts.map((product, index) => {
                const productName =
                  typeof product === "string"
                    ? product
                    : product?.name || "Unnamed Product";

                const productCategory =
                  typeof product === "object" && product !== null
                    ? product.category || "Tops"
                    : "Tops";

                return (
                  <li key={`${productName}-${index}`}>
                    <span>{productName}</span>
                    <span className="product-tag">
                      {productCategory}
                    </span>
                  </li>
                );
              })
            ) : (
              <li>No new products found.</li>
            )}
          </ul>
        </div>

      </section>

      {/* Financial Overview Chart */}
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
            <span>
              <i className="legend blue" />
              Income
            </span>

            <span>
              <i className="legend green" />
              Sales
            </span>

            <span>
              <i className="legend yellow" />
              Revenue
            </span>

            <span>
              <i className="legend red" />
              Tax
            </span>
          </div>

        </div>

        <div className="chart-box">

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
            className="chart-svg"
          >

            {/* Horizontal Grid Lines */}
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

            {/* Chart Axes */}
            <line
              x1="50"
              y1="20"
              x2="50"
              y2="220"
              stroke="#b8c0cc"
              strokeWidth="1"
            />

            <line
              x1="50"
              y1="220"
              x2="760"
              y2="220"
              stroke="#b8c0cc"
              strokeWidth="1"
            />

            {/* Y-Axis Labels */}
            {yTicks.slice(0, 10).map((tick, index) => (
              <text
                key={`${tick}-${index}`}
                x="14"
                y={218 - index * 20}
                fontSize="11"
                fill="#798399"
              >
                {tick}
              </text>
            ))}

            {/* X-Axis Labels */}
            {chartData.map((point, index) => {
              const x =
                chartData.length > 1
                  ? chartStartX +
                    (index * (chartEndX - chartStartX)) /
                      (chartData.length - 1)
                  : chartStartX;

              return (
                <text
                  key={`${point?.label || "point"}-${index}`}
                  x={x}
                  y="240"
                  fontSize="11"
                  textAnchor="middle"
                  fill="#798399"
                >
                  {point?.label ?? ""}
                </text>
              );
            })}

            {/* Dynamic Chart Lines */}
            {chartSeries.map((series) => (
              <polyline
                key={series.key}
                fill="none"
                stroke={series.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={getChartPoints(series.key)}
              />
            ))}

          </svg>

        </div>
      </section>

    </div>
  );
}

export default Dashboard;
