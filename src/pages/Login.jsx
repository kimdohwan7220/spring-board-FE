import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/auth/login", {
        username: id,
        password: pw,
      })
      .then(() => {
        localStorage.setItem("username", id); // ⭐ 로그인 성공 시 username 저장
        alert("로그인 성공!");
        navigate("/posts");
      })
      .catch(() => alert("로그인 실패"));
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      {/* 🔹 로고 이미지 (더 크게) */}
      <img
        src="/Logo.png"
        alt="logo"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          marginBottom: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      />

      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#6B4F3A" }}>
        로그인
      </h2>

      {/* 🔹 로그인 폼 박스 */}
      <div
        style={{
          width: "360px",
          padding: "25px",
          border: "1px solid #E8DCCF",
          borderRadius: "14px",
          backgroundColor: "rgba(255,255,255,0.85)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <form onSubmit={handleLogin}>
          {/* 아이디 */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#6B4F3A", fontWeight: "600" }}>아이디</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #D1BFA7",
                marginTop: "5px",
                backgroundColor: "#FFFDF9",
                color: "#4A403A",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* 비밀번호 */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#6B4F3A", fontWeight: "600" }}>비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #D1BFA7",
                marginTop: "5px",
                backgroundColor: "#FFFDF9",
                color: "#4A403A",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#D9B89C",
              color: "#4A332C",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            로그인
          </button>
        </form>
      </div>

      {/* 로그인 아래 텍스트 */}
      <p style={{ marginTop: "18px", color: "#6B4F3A" }}>
        아직 회원이 아니신가요?{" "}
        <Link to="/register" style={{ color: "#A67C52", fontWeight: "600" }}>
          회원가입
        </Link>
      </p>
    </div>
  );
}

export default Login;
