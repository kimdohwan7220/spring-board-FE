import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [profileImage, setProfileImage] = useState("/profile.png");

  useEffect(() => {
    if (!username) return;

    axios
      .get(`http://localhost:8080/auth/user?username=${username}`)
      .then((res) => {
        if (res.data.profileImage) {
          setProfileImage("http://localhost:8080" + res.data.profileImage);
        }
      })
      .catch(() => {});
  }, [username]);

  return (
    <div
      style={{
        width: "100%",
        padding: "15px 40px 20px",
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
      {/* 로고 */}
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

      {/* 🔥 유저 프로필 이미지 (동그란 모양) */}
      <img
        src={profileImage}
        alt="profile"
        onClick={() => navigate("/mypage")}
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
          border: "2px solid #D1BFA7",
        }}
      />
    </div>
  );
}

export default Navbar;
