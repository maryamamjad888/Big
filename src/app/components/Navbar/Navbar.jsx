'use client';
import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Hamburger from './Hamburger';
import Sidebar from './Sidebar';

function MyNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar-wrapper ${isSticky ? 'sticky' : ''}`}>
      <Navbar expand="lg">
        <Hamburger toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">LANDSCAPE</Nav.Link>
            <Nav.Link href="#about">ENGINEERING</Nav.Link>
            <Nav.Link href="#services">ARCHITECTURE</Nav.Link>
            <Nav.Link href="#planning">PLANNING</Nav.Link>
            <Nav.Link href="#products">PRODUCTS</Nav.Link>
          </Nav>
          <Form className="custom-form-search d-flex justify-content-end">
            <Button>
              <svg
                width="14"
                height="14"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ touchAction: 'none' }}
              >
                <circle
                  cx="7.5"
                  cy="5.5"
                  r="4.5"
                  stroke="black"
                  style={{ touchAction: 'none' }}
                ></circle>
                <path
                  d="M4 9L1 12"
                  stroke="black"
                  style={{ touchAction: 'none' }}
                ></path>
              </svg>
            </Button>
            <FormControl
              type="search"
              placeholder=""
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
