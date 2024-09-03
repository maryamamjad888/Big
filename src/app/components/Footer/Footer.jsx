import React, { useState } from "react";
import Link from "next/link";

function Footer() {
  const [visibleSection, setVisibleSection] = useState("");

  const handleToggle = (section) => {
    setVisibleSection((prevSection) =>
      prevSection === section ? "" : section
    );
  };

  return (
    <div className="footer">
      <div className="email">
        <div onClick={() => handleToggle("email")} className="footer-toggle">
          Email
          <span
            className={`icon ${visibleSection === "email" ? "rotate" : ""}`}
          >
            +
          </span>
        </div>
        <ul
          className={`email-list ${
            visibleSection === "email" ? "show" : "hide"
          }`}
        >
          <li>
            <span>new projects</span>
            <Link className="mails" href="mailto:newbiz@big.dk">
              newbiz@big.dk
            </Link>
          </li>
          <li>
            <span>press</span>
            <Link className="mails" href="mailto:press@big.dk">
              press@big.dk
            </Link>
          </li>
          <li>
            <span>lectures</span>
            <Link className="mails" href="mailto:lectures@big.dk">
              lectures@big.dk
            </Link>
          </li>
          <li>
            <span>exhibition</span>
            <Link className="mails" href="mailto:exhibition@big.dk">
              exhibition@big.dk
            </Link>
          </li>
        </ul>
      </div>

      <div className="offices">
        <div onClick={() => handleToggle("offices")} className="footer-toggle">
          Offices
          <span
            className={`icon ${visibleSection === "offices" ? "rotate" : ""}`}
          >
            +
          </span>
        </div>
        <ul
          className={`email-list ${
            visibleSection === "offices" ? "show" : "hide"
          }`}
        >
          <li>copenhagen</li>
          <li>london</li>
          <li>barcelona</li>
          <li>new york</li>
          <li>shenzhen</li>
          <li>los angeles</li>
          <li>oslo</li>
        </ul>
      </div>

      <div className="social">
        <div onClick={() => handleToggle("social")} className="footer-toggle">
          Social
          <span
            className={`icon ${visibleSection === "social" ? "rotate" : ""}`}
          >
            +
          </span>
        </div>
        <ul
          className={`email-list ${
            visibleSection === "social" ? "show" : "hide"
          }`}
        >
          <li>instagram</li>
          <li>twitter</li>
          <li>linkedin</li>
          <li>vimeo</li>
          <li>facebook</li>
        </ul>
      </div>

      <div className="legal">
        <div onClick={() => handleToggle("legal")} className="footer-toggle">
          Legal
          <span
            className={`icon ${visibleSection === "legal" ? "rotate" : ""}`}
          >
            +
          </span>
        </div>
        <ul
          className={`email-list ${
            visibleSection === "legal" ? "show" : "hide"
          }`}
        >
          <li>
            BIG's Anti-Slavery and Human <br />
            Trafficking Statement 2018
          </li>
          <li>BIG's Privacy Policy 2023</li>
          <li>BIG UN Global Compact Report</li>
          <li>
            BIG's Annual Sustainability. <br /> Report, 2023
          </li>
          <li>Ethics Hotline</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
