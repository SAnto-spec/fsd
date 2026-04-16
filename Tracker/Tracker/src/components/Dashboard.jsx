import React from "react";

const Dashboard = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="dashboard">
      <div className="summary-card balance-card">
        <p className="summary-label">Total Balance</p>
        <h2 className={`summary-amount ${balance >= 0 ? "positive" : "negative"}`}>
          ${balance.toFixed(2)}
        </h2>
        <div className="card-glow balance-glow"></div>
      </div>

      <div className="summary-row">
        <div className="summary-card income-card">
          <div className="summary-icon">↑</div>
          <p className="summary-label">Total Income</p>
          <h3 className="summary-amount positive">${totalIncome.toFixed(2)}</h3>
        </div>
        <div className="summary-card expense-card">
          <div className="summary-icon">↓</div>
          <p className="summary-label">Total Expenses</p>
          <h3 className="summary-amount negative">${totalExpenses.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
