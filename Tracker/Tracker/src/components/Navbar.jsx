import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-icon">💰</span>
        <h1 className="navbar-title">ExpenseTracker</h1>
      </div>
      <p className="navbar-subtitle">Manage your finances with ease</p>
    </nav>
  );
};

export default Navbar;