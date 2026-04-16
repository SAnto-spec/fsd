import React, { useState } from "react";

const Lists = ({ transactions, onAdd, onDelete }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a positive amount.");
      return;
    }
    setError("");
    onAdd({ description: description.trim(), amount: Number(amount), type });
    setDescription("");
    setAmount("");
    setType("income");
  };

  return (
    <div className="lists-container">
      {/* Form */}
      <div className="form-card">
        <h2 className="section-title">Add Transaction</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="e.g. Salary, Groceries..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Amount ($)</label>
              <input
                type="number"
                placeholder="0.00"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-select"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-add">
            + Add Transaction
          </button>
        </form>
      </div>

      {/* Transaction List */}
      <div className="list-card">
        <h2 className="section-title">Transaction History</h2>
        {transactions.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📋</span>
            <p>No transactions yet. Add one above!</p>
          </div>
        ) : (
          <ul className="transaction-list">
            {transactions.map((t) => (
              <li key={t.id} className={`transaction-item ${t.type}`}>
                <div className="transaction-info">
                  <span className="transaction-badge">
                    {t.type === "income" ? "↑" : "↓"}
                  </span>
                  <span className="transaction-desc">{t.description}</span>
                </div>
                <div className="transaction-right">
                  <span className={`transaction-amount ${t.type}`}>
                    {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                  </span>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(t.id)}
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Lists;