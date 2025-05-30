// src/pages/AboutPage.jsx
import React from "react";

const AboutPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About</h1>
      <p style={styles.text}>이거는 우리 프로젝트에 대한 소개입니다.</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  text: {
    textAlign: "center",
    maxWidth: "600px",
    lineHeight: 1.5,
  },
};

export default AboutPage;
