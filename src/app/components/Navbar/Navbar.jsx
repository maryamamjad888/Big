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
  const [activeFilter, setActiveFilter] = useState(""); // Tracks active parent filter
  const [placeholder, setPlaceholder] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
    // Toggle active filter when clicking the same item, otherwise set a new active filter
    if (activeFilter === keyword) {
      setActiveFilter("");
      onSearchChange("");
    } else {
      setActiveFilter(keyword);
      onSearchChange(keyword);
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
    setIsFocused(false); // Hide suggestions after selection
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
              <Nav.Link
                href="#landscape"
                onClick={() => handleNavClick("landscape")}
                className="nav-link"
              >
                {activeFilter === "landscape" && (
                  <span className="active-dot"></span>
                )}
                LANDSCAPE
                {activeFilter === "landscape" && (
                  <ul className="landscape-sub">
                    <li>Public Realm</li>
                    <li>Parks</li>
                    <li>Gardens</li>
                    <li>Terraces</li>
                  </ul>
                )}
              </Nav.Link>
              <Nav.Link
                href="#engineering"
                onClick={() => handleNavClick("engineering")}
                className="nav-link"
              >
                {activeFilter === "engineering" && (
                  <span className="active-dot"></span>
                )}
                ENGINEERING
                {activeFilter === "engineering" && (
                  <ul className="engineering-sub">
                    <li>Structure</li>
                    <li>Simulation</li>
                    <li>Sustainability</li>
                  </ul>
                )}
              </Nav.Link>
              <Nav.Link
                href="#architecture"
                onClick={() => handleNavClick("architecture")}
                className="nav-link"
              >
                {activeFilter === "architecture" && (
                  <span className="active-dot"></span>
                )}
                ARCHITECTURE
                {activeFilter === "architecture" && (
                  <ul className="architecture-sub">
                    <li>Culture</li>
                    <li>Education</li>
                    <li>Work</li>
                    <li>Hospitality</li>
                    <li>Residential</li>
                    <li>Infrastructure</li>
                    <li>Space</li>
                    <li>Interiors</li>
                    <li>Sports</li>
                    <li>Health</li>
                  </ul>
                )}
              </Nav.Link>
              <Nav.Link
                href="#planning"
                onClick={() => handleNavClick("planning")}
                className="nav-link"
              >
                {activeFilter === "planning" && (
                  <span className="active-dot"></span>
                )}
                PLANNING
                {activeFilter === "planning" && (
                  <ul className="planning-sub">
                    <li>Campus</li>
                    <li>City</li>
                    <li>Region</li>
                  </ul>
                )}
              </Nav.Link>
              <Nav.Link
                href="#products"
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
              </Nav.Link>
            </Nav>
            <Form className="custom-form-search d-flex justify-content-end">
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
