import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    alert(`회원가입 완료!\nID: ${id}`);
    navigate("/"); // 로그인 페이지로 이동
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>회원가입</h2>

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "15px" }}>
          <label>아이디</label><br />
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>비밀번호</label><br />
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          회원가입
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        이미 회원이신가요? <Link to="/">로그인</Link>
      </p>
    </div>
  );
}

export default Register;
