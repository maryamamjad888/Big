import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Hamburger from "./Hamburger";
import Sidebar from "./Sidebar";

function MyNavbar({ onSearchChange }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const placeholderValues = [
    "COMPLETED",
    "FRANCE",
    "EDUCATION",
    "MUSEUM",
    "SUSTAINABILITY",
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleNavClick = (keyword) => {
    if (activeFilter === keyword) {
      setActiveFilter("");
      onSearchChange("");
    } else {
      setActiveFilter(keyword);
      onSearchChange(keyword);
    }
  };
  const handleSubMenuClick = (parentFilter, subMenuOption, e) => {
    e.stopPropagation(); 
    
    if (activeSubMenu === subMenuOption) {
      setActiveSubMenu("");
      setActiveFilter("");
      onSearchChange("");
    } else {
      setActiveFilter(parentFilter);
      setActiveSubMenu(subMenuOption);
      onSearchChange(`${parentFilter},${subMenuOption}`); 
    }
  };
  
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setPlaceholder(suggestion);
    onSearchChange(suggestion);
    setIsFocused(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setPlaceholder(placeholderValues[currentIndex]);
      currentIndex = (currentIndex + 1) % placeholderValues.length;
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={`navbar-wrapper ${isSticky ? "sticky" : ""}`}>
        <Navbar expand="lg">
          <Hamburger toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div
                onClick={() => handleNavClick("landscape")}
                className={`nav-link ${activeFilter === "landscape" && !activeSubMenu ? "active" : ""}`}
              >
                {!activeSubMenu && activeFilter === "landscape" && <span className="active-dot"></span>}
                LANDSCAPE
                {activeFilter === "landscape" && (
                  <ul className="landscape-sub">
                    <li onClick={(e) => handleSubMenuClick("landscape", "Public Realm", e)}>
                    {activeSubMenu === "Public Realm" && <span className="active-dot"></span>}
                      Public Realm
                    </li>
                    <li onClick={(e) => handleSubMenuClick("landscape", "Parks", e)}>
                      {activeSubMenu === "Parks" && <span className="active-dot"></span>}
                      Parks
                    </li>
                    <li onClick={(e) => handleSubMenuClick("landscape", "Gardens", e)}>
                      {activeSubMenu === "Gardens" && <span className="active-dot"></span>}
                      Gardens
                    </li>
                    <li onClick={(e) => handleSubMenuClick("landscape", "Terraces", e)}>
                      {activeSubMenu === "Terraces" && <span className="active-dot"></span>}
                      Terraces
                    </li>
                  </ul>
                )}
              </div>
              <div
                onClick={() => handleNavClick("engineering")}
                className={`nav-link ${activeFilter === "engineering" && !activeSubMenu ? "active" : ""}`}
              >
                {!activeSubMenu && activeFilter === "engineering" && <span className="active-dot"></span>}
                ENGINEERING
                {activeFilter === "engineering" && (
                  <ul className="engineering-sub">
                    <li onClick={(e) => handleSubMenuClick("engineering", "Structure", e)}>
                    {activeSubMenu === "Structure" && <span className="active-dot"></span>}
                      Structure
                    </li>
                    <li onClick={(e) => handleSubMenuClick("engineering", "Simulation", e)}>
                    {activeSubMenu === "Simulation" && <span className="active-dot"></span>}
                      Simulation
                    </li>
                    <li onClick={(e) => handleSubMenuClick("engineering", "Sustainability", e)}>
                    {activeSubMenu === "Sustainability" && <span className="active-dot"></span>}
                      Sustainability
                    </li>
                  </ul>
                )}
              </div>
              <div
                onClick={() => handleNavClick("architecture")}
                className={`nav-link ${activeFilter === "architecture" && !activeSubMenu ? "active" : ""}`}
              >
                {!activeSubMenu && activeFilter === "architecture" && <span className="active-dot"></span>}
                ARCHITECTURE
                {activeFilter === "architecture" && (
                  <ul className="architecture-sub">
                    <li onClick={(e) => handleSubMenuClick("architecture", "Culture", e)}>
                    {activeSubMenu === "Culture" && <span className="active-dot"></span>}
                      Culture
                    </li>
                    <li onClick={(e) => handleSubMenuClick("architecture", "Education", e)}>
                    {activeSubMenu === "Education" && <span className="active-dot"></span>}
                      Education
                    </li>
                    <li onClick={(e) => handleSubMenuClick("architecture", "Work", e)}>
                    {activeSubMenu === "Work" && <span className="active-dot"></span>}
                      Work
                    </li>
                    <li onClick={(e) => handleSubMenuClick("architecture", "Hospitality", e)}>
                    {activeSubMenu === "Hospitality" && <span className="active-dot"></span>}
                      Hospitality
                    </li>
                    <li onClick={(e) => handleSubMenuClick("architecture", "Residential", e)}>
                    {activeSubMenu === "Residential" && <span className="active-dot"></span>}
                      Residential
                    </li>
                    <li onClick={(e) => handleSubMenuClick("architecture", "Infrastructure", e)}>
                    {activeSubMenu === "Infrastructure" && <span className="active-dot"></span>}
                      Infrastructure
                    </li>
                    <li onClick={(e) => handleSubMenuClick("architecture", "Space", e)}>
                    {activeSubMenu === "Space" && <span className="active-dot"></span>}
                      Space
                    </li>
                    <li onClick={(e) => handleSubMenuClick("architecture", "Interiors", e)}>
                    {activeSubMenu === "Interiors" && <span className="active-dot"></span>}
                      Interiors
                    </li>
                    <li onClick={(e) => handleSubMenuClick("architecture", "Sports", e)}>
                    {activeSubMenu === "Sports" && <span className="active-dot"></span>}
                      Sports
                    </li>
                    <li onClick={(e) => handleSubMenuClick("architecture", "Health", e)}>
                    {activeSubMenu === "Health" && <span className="active-dot"></span>}
                      Health
                    </li>
                  </ul>
                )}
              </div>
              <div
                onClick={() => handleNavClick("planning")}
                className={`nav-link ${activeFilter === "planning" && !activeSubMenu ? "active" : ""}`}
              >
                {!activeSubMenu && activeFilter === "planning" && <span className="active-dot"></span>}
                PLANNING
                {activeFilter === "planning" && (
                  <ul className="planning-sub">
                    <li onClick={(e) => handleSubMenuClick("planning", "Campus", e)}>
                    {activeSubMenu === "Campus" && <span className="active-dot"></span>}
                      Campus
                    </li>
                    <li onClick={(e) => handleSubMenuClick("planning", "City", e)}>
                    {activeSubMenu === "City" && <span className="active-dot"></span>}
                      City
                    </li>
                    <li onClick={(e) => handleSubMenuClick("planning", "Region", e)}>
                    {activeSubMenu === "Region" && <span className="active-dot"></span>}
                      Region
                    </li>
                  </ul>
                )}
              </div>
              <div
                onClick={() => handleNavClick("products")}
                className="nav-link"
              >
                {activeFilter === "products" && (
                  <span className="active-dot"></span>
                )}
                PRODUCTS
                {activeFilter === "products" && (
                  <ul className="products-sub">
                    <li>Lighting</li>
                    <li>Furniture</li>
                    <li>Consumer products</li>
                    <li>Mobility</li>
                    <li>Installations</li>
                  </ul>
                )}
              </div>
            </Nav>
            <Form className="custom-form-search d-flex">
              <Button>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ touchAction: "none" }}
                >
                  <circle
                    cx="7.5"
                    cy="5.5"
                    r="4.5"
                    stroke="black"
                    style={{ touchAction: "none" }}
                  ></circle>
                  <path
                    d="M4 9L1 12"
                    stroke="black"
                    style={{ touchAction: "none" }}
                  ></path>
                </svg>
              </Button>
              <FormControl
                type="search"
                className="me-2 custom-search-input"
                placeholder={isFocused ? "" : placeholder}
                aria-label="Search"
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {isFocused && (
                <ul className="suggestions">
                  {placeholderValues.map((value, index) => (
                    <li
                      key={index}
                      onMouseDown={() => handleSuggestionClick(value)}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              )}
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default MyNavbar;
