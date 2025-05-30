import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [crime, setCrime] = useState(5);
  const [rent, setRent] = useState(5);
  const [facility, setFacility] = useState(5);
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/results", { state: { crime, rent, facility, address } });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {/* 1️⃣ 필터 슬라이더 섹션 */}
      <section style={styles.filterBox}>
        <h2 style={styles.filterTitle}>중요도를 선택하세요</h2>

        <div style={styles.row}>
          <label style={styles.label}>범죄율:</label>
          <input
            type="range"
            min={0}
            max={10}
            value={crime}
            onChange={(e) => setCrime(+e.target.value)}
            style={styles.slider}
          />
          <span style={styles.value}>{crime}</span>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>월세:</label>
          <input
            type="range"
            min={0}
            max={10}
            value={rent}
            onChange={(e) => setRent(+e.target.value)}
            style={styles.slider}
          />
          <span style={styles.value}>{rent}</span>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>편의시설:</label>
          <input
            type="range"
            min={0}
            max={10}
            value={facility}
            onChange={(e) => setFacility(+e.target.value)}
            style={styles.slider}
          />
          <span style={styles.value}>{facility}</span>
        </div>
      </section>

      {/* 2️⃣ 주소 입력 섹션 */}
      <section style={styles.addressBox}>
        <h3 style={styles.addressTitle}>나의 공간</h3>
        <label style={styles.labelInline}>주소 입력:</label>
        <input
          type="text"
          placeholder="예) 서울시 강남구 역삼동"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.addressInput}
        />
      </section>

      {/* 3️⃣ 제출 버튼 */}
      <button type="submit" style={styles.submitBtn}>
        Submit
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "800px",
    margin: "2rem auto",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  filterBox: {
    backgroundColor: "#d7efff",
    padding: "1.5rem",
    borderRadius: "8px",
  },
  filterTitle: {
    margin: 0,
    marginBottom: "1rem",
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.75rem",
  },
  label: {
    width: "6rem",
    fontWeight: "500",
  },
  slider: {
    flex: 1,
    accentColor: "#00AEEF",
  },
  value: {
    marginLeft: "1rem",
    minWidth: "2rem",
    textAlign: "center",
    fontWeight: "500",
  },
  addressBox: {
    padding: "1rem",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  addressTitle: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: "500",
  },
  labelInline: {
    minWidth: "4rem",
  },
  addressInput: {
    flex: 1,
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  submitBtn: {
    alignSelf: "flex-end",
    padding: "0.75rem 2rem",
    backgroundColor: "#00AEEF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default SearchPage;
