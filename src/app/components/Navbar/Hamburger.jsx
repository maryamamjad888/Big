'use client';
import React from 'react';


const Hamburger = ({ toggleSidebar }) => {
  return (
    <div className="hamburger" onClick={toggleSidebar}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
};

export default Hamburger;
