// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        padding: "15px 40px",
        paddingBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        background: "#FFF8EE",
        borderBottom: "1px solid #E2D9CF",
        zIndex: 10,
      }}
    >
      {/* 로고 (좌측) */}
      <img
        src="/Logo.png"
        alt="logo"
        onClick={() => navigate("/posts")}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />

      {/* 중앙 텍스트 */}
      <h2
        className="logo-title"
        style={{
          margin: 0,
          fontSize: "32px",
          color: "#4A403A",
          fontWeight: "700",
        }}
      >
        Meer Board
      </h2>

      {/* 프로필 (우측) */}
      <img
        src="/profile.png"
        alt="profile"
        onClick={() => navigate("/mypage")}
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default Navbar;
