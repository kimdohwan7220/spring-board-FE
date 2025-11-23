import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 🔥 백엔드로 회원가입 요청 보내기
      await axios.post("http://localhost:8080/auth/register", {
        username: id,
        password: pw,
      });

      alert("회원가입이 완료되었습니다!");
      navigate("/");  // 로그인 페이지로 이동

    } catch (err) {
      alert("회원가입 실패! 이미 존재하는 아이디가 있을 수 있습니다.");
    }
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
