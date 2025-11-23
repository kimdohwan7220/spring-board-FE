import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [profile, setProfile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [newName, setNewName] = useState("");
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");

  // ⭐ 유저 정보 불러오기 (프로필 이미지 표시)
  useEffect(() => {
    axios
      .get(`http://localhost:8080/auth/user?username=${username}`)
      .then((res) => {
        setProfile(res.data);
        if (res.data.profileImage) {
          setImagePreview("http://localhost:8080" + res.data.profileImage);
        }
      })
      .catch(() => {});
  }, [username]);

  // ⭐ 프로필 이미지 업로드
  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("username", username);
    form.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8080/users/profile-image",
        form
      );

      alert("프로필 사진이 변경되었습니다!");
      setImagePreview("http://localhost:8080" + res.data);
    } catch {
      alert("업로드 실패");
    }
  };

  // ⭐ 닉네임 변경
  const handleChangeNickname = async () => {
    try {
      await axios.put("http://localhost:8080/users/username", {
        oldUsername: username,
        newUsername: newName,
      });

      alert("닉네임이 변경되었습니다!");

      localStorage.setItem("username", newName); // 업데이트
      setNewName("");
      window.location.reload();
    } catch {
      alert("닉네임 변경 실패 (중복된 닉네임일 수 있음)");
    }
  };

  // ⭐ 비밀번호 변경
  const handleChangePassword = async () => {
    try {
      await axios.put("http://localhost:8080/users/password", {
        username,
        oldPassword: oldPw,
        newPassword: newPw,
      });

      alert("비밀번호가 변경되었습니다!");
      setOldPw("");
      setNewPw("");
    } catch {
      alert("비밀번호 변경 실패");
    }
  };

  return (
    <>
      <Navbar />

      {/* ⭐ 마이페이지 전체 컨테이너 */}
      <div
        style={{
          maxWidth: "600px",
          margin: "60px auto 20px auto",
          padding: "25px",
          background: "rgba(255,255,255,0.9)",
          borderRadius: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          fontFamily: "'Poppins','Jua',sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#4A403A" }}>마이페이지</h2>

        {/* -------------------- 프로필 이미지 -------------------- */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "3px solid #D1BFA7",
              backgroundColor: "#FFF7EE",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              cursor: "pointer",
              overflow: "hidden",
              transition: "0.2s",
            }}
            onClick={() => document.getElementById("fileInput").click()}
            onMouseOver={(e) =>
              (e.currentTarget.style.borderColor = "#C49D85")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.borderColor = "#D1BFA7")
            }
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span style={{ color: "#B28A72", fontSize: "14px" }}>
                사진 업로드
              </span>
            )}
          </div>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfileUpload}
          />

          <h3 style={{ marginTop: "10px", color: "#6B4F3A" }}>{username}</h3>
        </div>

        <hr style={{ margin: "25px 0" }} />

        {/* -------------------- ⭐ 닉네임 변경 (위로 이동됨) -------------------- */}
        <h3 style={{ color: "#4A403A" }}>닉네임 변경</h3>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "600", color: "#6B4F3A" }}>
            새 닉네임
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              borderRadius: "8px",
              border: "1px solid #D1BFA7",
              backgroundColor: "#FFFDF9",
              color: "#4A403A",
            }}
          />
        </div>

        <button
          onClick={handleChangeNickname}
          style={{
            width: "100%",
            padding: "12px",
            background: "#C4A58A",
            color: "#4A332C",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "25px",
          }}
        >
          닉네임 변경
        </button>

        <hr style={{ margin: "25px 0" }} />

        {/* -------------------- ⭐ 비밀번호 변경 -------------------- */}
        <h3 style={{ color: "#4A403A" }}>비밀번호 변경</h3>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "600", color: "#6B4F3A" }}>
            기존 비밀번호
          </label>
          <input
            type="password"
            value={oldPw}
            onChange={(e) => setOldPw(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              borderRadius: "8px",
              border: "1px solid #D1BFA7",
              backgroundColor: "#FFFDF9",
              color: "#4A403A",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "600", color: "#6B4F3A" }}>
            새 비밀번호
          </label>
          <input
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              borderRadius: "8px",
              border: "1px solid #D1BFA7",
              backgroundColor: "#FFFDF9",
              color: "#4A403A",
            }}
          />
        </div>

        <button
          onClick={handleChangePassword}
          style={{
            width: "100%",
            padding: "12px",
            background: "#D9B89C",
            color: "#4A332C",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          비밀번호 변경
        </button>
      </div>

      {/* -------------------- 로그아웃 버튼 -------------------- */}
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <button
          onClick={() => {
            localStorage.removeItem("username");
            navigate("/");
          }}
          style={{
            padding: "12px 24px",
            backgroundColor: "#E29E7E",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
          }}
        >
          로그아웃
        </button>
      </div>
    </>
  );
}

export default MyPage;
