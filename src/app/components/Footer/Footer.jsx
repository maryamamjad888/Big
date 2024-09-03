import React, { useState } from "react";
import Link from "next/link";

function Footer() {
  const [showEmailList, setShowEmailList] = useState(false);

  const handleEmailClick = () => {
    setShowEmailList(!showEmailList);
  };

  return (
    <div className="footer">
      <div>
        <div onClick={handleEmailClick} className="footer-toggle">
          Email
          <span className={`icon ${showEmailList ? "rotate" : ""}`}>+</span>
        </div>

        <ul className={`email-list ${showEmailList ? "show" : "hide"}`}>
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
      <div>Offices +</div>
      <div>Social +</div>
      <div>Legal +</div>
    </div>
  );
}

export default Footer;
