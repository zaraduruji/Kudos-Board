// src/components/Header.jsx

import React from 'react';
import './Header.css';

function Header({ handleDisplayCreateForm }) {
  return (
    <header className="header">
      <div className="logo">
        <h1>KUDOSBOARD</h1>
      </div>
    </header>
  );
}

export default Header;
