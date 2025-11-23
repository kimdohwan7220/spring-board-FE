import React from "react";

// src/pages/MyPage.jsx
function MyPage() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "60px auto",
        padding: "20px",
        background: "rgba(255,255,255,0.9)",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#4A403A" }}>마이페이지</h2>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img
          src="/profile.png"
          alt="profile"
          style={{ width: "90px", height: "90px", borderRadius: "50%" }}
        />
        <h3 style={{ marginTop: "10px", color: "#6B4F3A" }}>yuna7220</h3>
      </div>

      <hr style={{ margin: "25px 0" }} />

      <p style={{ color: "#6B4F3A" }}>✨ 앞으로 여기에 이런 기능 추가 가능:</p>
      <ul style={{ lineHeight: "1.8", color: "#4A403A" }}>
        <li>내가 작성한 게시글 목록</li>
        <li>내가 작성한 댓글</li>
        <li>프로필 이미지 변경</li>
        <li>비밀번호 변경</li>
        <li>회원 탈퇴</li>
      </ul>
    </div>
  );
}

export default MyPage;
