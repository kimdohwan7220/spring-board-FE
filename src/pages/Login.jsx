import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔥 지금은 임시 로그인 로직
    if (id === "yuna" && pw === "1234") {
      alert("로그인 성공!");
      navigate("/posts");   // 게시판으로 이동
    } else {
      alert("로그인 실패!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>로그인</h2>

      <form onSubmit={handleLogin}>
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
          로그인
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        아직 회원이 아니신가요?{" "}
        <Link to="/register">회원가입</Link>
      </p>
    </div>
  );
}

export default Login;
