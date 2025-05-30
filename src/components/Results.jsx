// src/components/Results.jsx
import React from "react";

const Results = ({ items = [] }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    {items.map((item, i) => (
      <div
        key={i}
        style={{
          padding: "1rem",
          border: "1px solid #ddd",
          borderRadius: "6px",
          background: "#fff",
        }}
      >
        <h3>
          {i + 1}. {item.name}
        </h3>
        <p>{item.description}</p>
        <ul style={{ margin: 0, paddingLeft: "1rem" }}>
          <li>평균 월세: {item.rent}원</li>
          <li>교통: {item.transport}</li>
          <li>치안: {item.safety}</li>
        </ul>
      </div>
    ))}
  </div>
);

export default Results;
