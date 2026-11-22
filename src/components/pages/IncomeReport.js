
import { useState } from "react";
import "../../assets/css/IncomeReport.css";

function IncomeReport() {
  const [period, setPeriod] = useState("Monthly");
  const [chartPeriod, setChartPeriod] = useState("Day");

  const incomeData = [
    { name: "Clothing Income", amount: 45000 },
    { name: "Accessories Income", amount: 8500 },
    { name: "Shoes Income", amount: 3250 },
    { name: "Bags Income", amount: 3250 },
  ];

  const expenseData = [
    { name: "Cost of Sales", amount: 10000, percentage: 60 },
    { name: "Salary Expenses", amount: 3750, percentage: 22.5 },
    { name: "Utilities", amount: 1500, percentage: 9 },
    { name: "Rent Expenses", amount: 825, percentage: 5 },
    { name: "Supply Expenses", amount: 575, percentage: 3.5 },
  ];

  const chartData = {
    Day: [
      { label: "Week 1", income: 48000, expenses: 10500, profit: 37500 },
      { label: "Week 2", income: 52000, expenses: 11200, profit: 40800 },
      { label: "Week 3", income: 56500, expenses: 12300, profit: 44200 },
      { label: "Week 4", income: 61000, expenses: 13300, profit: 47700 },
    ],
    Week: [
      { label: "Week 1", income: 48000, expenses: 10500, profit: 37500 },
      { label: "Week 2", income: 52000, expenses: 11200, profit: 40800 },
      { label: "Week 3", income: 56500, expenses: 12300, profit: 44200 },
      { label: "Week 4", income: 61000, expenses: 13300, profit: 47700 },
    ],
    Month: [
      { label: "Jan", income: 45000, expenses: 12000, profit: 33000 },
      { label: "Feb", income: 52000, expenses: 15000, profit: 37000 },
      { label: "Mar", income: 58000, expenses: 18000, profit: 40000 },
      { label: "Apr", income: 63800, expenses: 19000, profit: 44800 },
    ],
    Year: [
      { label: "2023", income: 150000, expenses: 45000, profit: 105000 },
      { label: "2024", income: 218800, expenses: 49000, profit: 169800 },
      { label: "2025", income: 195000, expenses: 52000, profit: 143000 },
      { label: "2026", income: 230000, expenses: 55000, profit: 175000 },
    ],
  };

  const formatMoney = (amount) =>
    `₱${amount.toLocaleString("en-PH")}`;

  const totalIncome = 218800;
  const totalExpenses = 49000;
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(2);

  const statementIncome = incomeData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const statementExpenses = expenseData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const exportReport = () => {
    const rows = [
      ["INCOME REPORT"],
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
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
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

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const currentChart = chartData[chartPeriod];

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
            <span className="summary-growth green-text">↑ +12.5%</span>
          </div>

          <div className="income-summary-card red-border">
            <div className="summary-label">TOTAL EXPENSES</div>
            <div className="summary-value">
              {formatMoney(totalExpenses)}
            </div>
            <span className="summary-growth red-text">↑ +5.2%</span>
          </div>

          <div className="income-summary-card green-border">
            <div className="summary-label">NET PROFIT</div>
            <div className="summary-value">
              {formatMoney(netProfit)}
            </div>
            <span className="summary-growth green-text">↑ +15.8%</span>
          </div>

          <div className="income-summary-card yellow-border">
            <div className="summary-label">PROFIT MARGIN</div>
            <div className="summary-value">
              {profitMargin}%
            </div>
            <span className="summary-growth green-text">↑ +3.2%</span>
          </div>

        </section>

        {/* Income vs Expenses Chart */}
        <section className="income-chart-panel">

          <div className="income-chart-header">

            <h3>Income vs Expenses Overview</h3>

            <div className="chart-controls">
              <div className="chart-tabs">
                {["Day", "Week", "Month", "Year"].map((tab) => (
                  <button
                    key={tab}
                    className={chartPeriod === tab ? "active" : ""}
                    onClick={() => setChartPeriod(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="chart-legend">
                <span><i className="legend-income" />Income</span>
                <span><i className="legend-expenses" />Expenses</span>
                <span><i className="legend-profit" />Profit</span>
              </div>
            </div>

          </div>

          <div className="income-bar-chart">

            <div className="chart-y-axis">
              <span>₱70,000</span>
              <span>₱60,000</span>
              <span>₱50,000</span>
              <span>₱40,000</span>
              <span>₱30,000</span>
              <span>₱20,000</span>
              <span>₱10,000</span>
              <span>₱0</span>
            </div>

            <div className="chart-main">
              <div className="chart-grid-lines">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} />
                ))}
              </div>

              <div className="chart-columns">
                {currentChart.map((item) => (
                  <div className="chart-column-group" key={item.label}>

                    <div className="chart-bars">
                      <div
                        className="chart-bar income-bar"
                        style={{ height: `${(item.income / 70000) * 100}%` }}
                        title={`Income: ${formatMoney(item.income)}`}
                      />

                      <div
                        className="chart-bar expenses-bar"
                        style={{ height: `${(item.expenses / 70000) * 100}%` }}
                        title={`Expenses: ${formatMoney(item.expenses)}`}
                      />

                      <div
                        className="chart-bar profit-bar"
                        style={{ height: `${(item.profit / 70000) * 100}%` }}
                        title={`Profit: ${formatMoney(item.profit)}`}
                      />
                    </div>

                    <span className="chart-x-label">{item.label}</span>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Financial Details */}
        <section className="income-details-grid">

          {/* Income Statement */}
          <div className="income-panel statement-panel">

            <div className="income-panel-header">
              <h3>Income Statement</h3>
              <span className="statement-date">January 2024</span>
            </div>

            <div className="statement-content">

              <h4 className="statement-income-title">Income</h4>

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
                  {formatMoney(statementIncome)}
                </strong>
              </div>

              <h4 className="statement-expense-title">Expenses</h4>

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
                  {formatMoney(statementExpenses)}
                </strong>
              </div>

              <div className="net-profit-banner">
                <span>Net Profit (Income - Expenses)</span>
                <strong>
                  {formatMoney(statementIncome - statementExpenses)}
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
                <div className="donut-chart" />

                <div className="donut-legend">
                  <span>
                    <i className="donut-blue" />
                    Clothing (75%)
                  </span>
                  <span>
                    <i className="donut-green" />
                    Accessories (14.2%)
                  </span>
                  <span>
                    <i className="donut-yellow" />
                    Shoes (5.4%)
                  </span>
                  <span>
                    <i className="donut-red" />
                    Bags (5.4%)
                  </span>
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
                  <div className="expense-progress-row" key={item.name}>

                    <span className="expense-name">{item.name}</span>

                    <span className="expense-amount">
                      {formatMoney(item.amount)}
                    </span>

                    <div className="expense-progress">
                      <div
                        className={`expense-progress-fill fill-${index}`}
                        style={{ width: `${item.percentage}%` }}
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
