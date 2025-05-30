import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img
          src={icon}
          alt="real estate"
          style={{
            width: "32px",
            height: "32px",
            verticalAlign: "middle",
            marginRight: "0.75rem",
          }}
        />
        <span style={styles.logoText}>이사하자</span>
      </div>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" style={styles.link}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" style={styles.link}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.2rem 2.5rem",
    borderBottom: "1px solid #e5e5e5",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#222",
    letterSpacing: "0.02em",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "2rem",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: 500,
    fontSize: "1.1rem",
    transition: "color 0.2s",
  },
};

export default Navbar;
