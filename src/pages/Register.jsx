import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/auth/register", {
        username: id,
        password: pw,
      });

      alert("회원가입이 완료되었습니다!");
      navigate("/"); // 로그인 페이지로 이동
    } catch (error) {
      alert("회원가입 실패! 아이디가 이미 존재하거나 서버 오류입니다.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column", 
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 🔹 로고 이미지 (로그인과 동일) */}
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
        회원가입
      </h2>

      {/* 🔹 폼 박스 */}
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
        <form onSubmit={handleRegister}>
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
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #D1BFA7",
                backgroundColor: "#FFFDF9", // 연한 베이지
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
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #D1BFA7",
                backgroundColor: "#FFFDF9",
                color: "#4A403A",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#D9B89C", // 카페톤 베이지
              color: "#4A332C",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            회원가입
          </button>
        </form>
      </div>

      {/* 폼 밖 텍스트 */}
      <p style={{ marginTop: "18px", color: "#6B4F3A" }}>
        이미 회원이신가요?{" "}
        <Link to="/" style={{ color: "#A67C52", fontWeight: "600" }}>
          로그인
        </Link>
      </p>
    </div>
  );
}

export default Register;
