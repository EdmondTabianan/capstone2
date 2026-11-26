
import { useState } from "react";
import "../../assets/css/IncomeReport.css";
import productData from "../../data/product.json";

function IncomeReport() {
  const [period, setPeriod] = useState("Monthly");

  // Fetch bales from product.json
  const bales = Array.isArray(productData.bales)
    ? productData.bales
    : [];

  // Currency formatter
  const formatMoney = (amount) =>
    `₱${Number(amount || 0).toLocaleString("en-PH")}`;

  // Group bale records by supplier
  const supplierData = Object.values(
    bales.reduce((groups, bale) => {
      const supplier = bale.supplier || "Unknown Supplier";

      if (!groups[supplier]) {
        groups[supplier] = {
          name: supplier,
          cost: 0,
          profit: 0,
          stock: 0,
        };
      }

      groups[supplier].cost += Number(bale.cost || 0);
      groups[supplier].profit += Number(bale.profit || 0);
      groups[supplier].stock += Number(bale.stock || 0);

      return groups;
    }, {})
  );

  // Income = Cost + Net Profit
  const incomeData = supplierData.map((item) => ({
    name: item.name,
    amount: item.cost + item.profit,
  }));

  // Expenses from bale acquisition costs
  const totalCost = bales.reduce(
    (sum, bale) => sum + Number(bale.cost || 0),
    0
  );

  const totalProfit = bales.reduce(
    (sum, bale) => sum + Number(bale.profit || 0),
    0
  );

  const totalIncome = totalCost + totalProfit;
  const totalExpenses = totalCost;
  const netProfit = totalProfit;

  const profitMargin =
    totalIncome > 0
      ? ((netProfit / totalIncome) * 100).toFixed(2)
      : "0.00";

  // Income breakdown
  const incomeBreakdown = incomeData.map((item) => ({
    ...item,
    percentage:
      totalIncome > 0
        ? (item.amount / totalIncome) * 100
        : 0,
  }));

  // Expenses breakdown
  const expenseData = [
    {
      name: "Cost of Bales",
      amount: totalCost,
      percentage: totalExpenses > 0 ? 100 : 0,
    },
  ];

  // Chart data grouped by supplier
  const chartData = supplierData.map((item) => ({
    label: item.name,
    income: item.cost + item.profit,
    expenses: item.cost,
    profit: item.profit,
  }));

  const chartMaximum = Math.max(
    ...chartData.map((item) => item.income),
    1
  );

  // Export report to CSV
  const exportReport = () => {
    const rows = [
      ["INCOME REPORT"],
      ["Period", period],
      ["Category", "Description", "Amount"],
      ...incomeData.map((item) => [
        "Income",
        item.name,
        item.amount,
      ]),
      ...expenseData.map((item) => [
        "Expenses",
        item.name,
        item.amount,
      ]),
      ["Summary", "Total Income", totalIncome],
      ["Summary", "Total Expenses", totalExpenses],
      ["Summary", "Net Profit", netProfit],
      ["Summary", "Profit Margin", `${profitMargin}%`],
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Income_Report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  // Email report
  const emailReport = () => {
    const subject = encodeURIComponent("Income Report");

    const body = encodeURIComponent(
      `INCOME REPORT\n\n` +
      `Total Income: ${formatMoney(totalIncome)}\n` +
      `Total Expenses: ${formatMoney(totalExpenses)}\n` +
      `Net Profit: ${formatMoney(netProfit)}\n` +
      `Profit Margin: ${profitMargin}%\n\n` +
      `Please see the attached income report.`
    );

    window.location.href =
      `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <section className="income-report-page">

      {/* Header */}
      <header className="income-report-header">
        <h1>INCOME REPORT</h1>

        <div className="income-header-actions">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>

          <button
            className="header-action"
            onClick={() => window.print()}
            title="Print"
          >
            Print
          </button>
        </div>
      </header>

      <div className="income-report-content">

        {/* Summary Cards */}
        <section className="income-summary-grid">

          <div className="income-summary-card blue-border">
            <div className="summary-label">TOTAL INCOME</div>
            <div className="summary-value">
              {formatMoney(totalIncome)}
            </div>
          </div>

          <div className="income-summary-card red-border">
            <div className="summary-label">TOTAL EXPENSES</div>
            <div className="summary-value">
              {formatMoney(totalExpenses)}
            </div>
          </div>

          <div className="income-summary-card green-border">
            <div className="summary-label">NET PROFIT</div>
            <div className="summary-value">
              {formatMoney(netProfit)}
            </div>
          </div>

          <div className="income-summary-card yellow-border">
            <div className="summary-label">PROFIT MARGIN</div>
            <div className="summary-value">
              {profitMargin}%
            </div>
          </div>

        </section>

        {/* Income vs Expenses Chart */}
        <section className="income-chart-panel">

          <div className="income-chart-header">
            <h3>Income vs Expenses Overview</h3>

            <div className="chart-controls">
              <div className="chart-legend">
                <span>
                  <i className="legend-income" />
                  Income
                </span>

                <span>
                  <i className="legend-expenses" />
                  Expenses
                </span>

                <span>
                  <i className="legend-profit" />
                  Profit
                </span>
              </div>
            </div>
          </div>

          <div className="income-bar-chart">

            <div className="chart-y-axis">
              {Array.from({ length: 8 }, (_, index) => {
                const value = chartMaximum * (7 - index) / 7;

                return (
                  <span key={index}>
                    {formatMoney(Math.round(value))}
                  </span>
                );
              })}
            </div>

            <div className="chart-main">

              <div className="chart-grid-lines">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} />
                ))}
              </div>

              <div className="chart-columns">

                {chartData.map((item) => (
                  <div
                    className="chart-column-group"
                    key={item.label}
                  >

                    <div className="chart-bars">

                      <div
                        className="chart-bar income-bar"
                        style={{
                          height: `${(item.income / chartMaximum) * 100}%`,
                        }}
                        title={`Income: ${formatMoney(item.income)}`}
                      />

                      <div
                        className="chart-bar expenses-bar"
                        style={{
                          height: `${(item.expenses / chartMaximum) * 100}%`,
                        }}
                        title={`Expenses: ${formatMoney(item.expenses)}`}
                      />

                      <div
                        className="chart-bar profit-bar"
                        style={{
                          height: `${(item.profit / chartMaximum) * 100}%`,
                        }}
                        title={`Profit: ${formatMoney(item.profit)}`}
                      />

                    </div>

                    <span className="chart-x-label">
                      {item.label}
                    </span>

                  </div>
                ))}

              </div>
            </div>
          </div>

          <p style={{ fontSize: "12px", color: "#777" }}>
            Chart grouped by supplier using available bale records.
          </p>

        </section>

        {/* Financial Details */}
        <section className="income-details-grid">

          {/* Income Statement */}
          <div className="income-panel statement-panel">

            <div className="income-panel-header">
              <h3>Income Statement</h3>
              <span className="statement-date">
                All Available Records
              </span>
            </div>

            <div className="statement-content">

              <h4 className="statement-income-title">
                Income
              </h4>

              {incomeData.map((item) => (
                <div className="statement-row" key={item.name}>
                  <span>{item.name}</span>

                  <strong className="green-text">
                    {formatMoney(item.amount)}
                  </strong>
                </div>
              ))}

              <div className="statement-row total-row">
                <strong>Total Income</strong>

                <strong className="green-text">
                  {formatMoney(totalIncome)}
                </strong>
              </div>

              <h4 className="statement-expense-title">
                Expenses
              </h4>

              {expenseData.map((item) => (
                <div className="statement-row" key={item.name}>
                  <span>{item.name}</span>

                  <strong className="red-text">
                    {formatMoney(item.amount)}
                  </strong>
                </div>
              ))}

              <div className="statement-row total-row">
                <strong>Total Expenses</strong>

                <strong className="red-text">
                  {formatMoney(totalExpenses)}
                </strong>
              </div>

              <div className="net-profit-banner">
                <span>
                  Net Profit (Income - Expenses)
                </span>

                <strong>
                  {formatMoney(netProfit)}
                </strong>
              </div>

            </div>
          </div>

          {/* Right Side */}
          <div className="income-right-column">

            {/* Income Breakdown */}
            <div className="income-panel breakdown-panel">

              <div className="income-panel-header">
                <h3>Income Breakdown</h3>
              </div>

              <div className="donut-wrapper">

                <div
                  className="donut-chart"
                  style={{
                    background:
                      incomeBreakdown.length > 0
                        ? `conic-gradient(${incomeBreakdown
                            .map((item, index) => {
                              const colors = [
                                "#3b82f6",
                                "#22c55e",
                                "#eab308",
                                "#ef4444",
                                "#8b5cf6",
                                "#06b6d4",
                              ];

                              const start = incomeBreakdown
                                .slice(0, index)
                                .reduce(
                                  (sum, value) => sum + value.percentage,
                                  0
                                );

                              const end = start + item.percentage;

                              return `${colors[index % colors.length]} ${start}% ${end}%`;
                            })
                            .join(", ")})`
                        : "#e5e7eb",
                  }}
                />

                <div className="donut-legend">

                  {incomeBreakdown.map((item, index) => {
                    const colors = [
                      "#3b82f6",
                      "#22c55e",
                      "#eab308",
                      "#ef4444",
                      "#8b5cf6",
                      "#06b6d4",
                    ];

                    return (
                      <span key={item.name}>
                        <i
                          style={{
                            backgroundColor:
                              colors[index % colors.length],
                          }}
                        />

                        {item.name} ({item.percentage.toFixed(1)}%)
                      </span>
                    );
                  })}

                  {incomeBreakdown.length === 0 && (
                    <span>No income records available.</span>
                  )}

                </div>
              </div>
            </div>

            {/* Expenses Breakdown */}
            <div className="income-panel expenses-breakdown-panel">

              <div className="income-panel-header">
                <h3>Expenses Breakdown</h3>
              </div>

              <div className="expense-progress-list">

                {expenseData.map((item, index) => (
                  <div
                    className="expense-progress-row"
                    key={item.name}
                  >

                    <span className="expense-name">
                      {item.name}
                    </span>

                    <span className="expense-amount">
                      {formatMoney(item.amount)}
                    </span>

                    <div className="expense-progress">

                      <div
                        className={`expense-progress-fill fill-${index}`}
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />

                    </div>

                    <span className="expense-percent">
                      {item.percentage}%
                    </span>

                  </div>
                ))}

              </div>
            </div>

            {/* Report Actions */}
            <div className="income-panel report-actions">

              <button
                className="export-report-btn"
                onClick={exportReport}
              >
                Export Report
              </button>

              <button
                className="print-report-btn"
                onClick={() => window.print()}
              >
                Print
              </button>

              <button
                className="email-report-btn"
                onClick={emailReport}
              >
                Email
              </button>

            </div>

          </div>
        </section>

      </div>
    </section>
  );
}

export default IncomeReport;
