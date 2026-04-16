import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Lists from "./pages/Lists";
import "./index.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([
      { ...transaction, id: Date.now() },
      ...transactions,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Dashboard transactions={transactions} />
        <Lists
          transactions={transactions}
          onAdd={addTransaction}
          onDelete={deleteTransaction}
        />
      </main>
    </div>
  );
};

export default App;