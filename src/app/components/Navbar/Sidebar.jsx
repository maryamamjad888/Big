'use client';
import React from 'react';


const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li><a href="#project">PROJECTS</a></li>
        <li><a href="#news">NEWS</a></li>
        <li><a href="#about">ABOUT</a></li>
        <li><a href="#people">PEOPLE</a></li>
        <li><a href="#career">CAREERS</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
