import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/posts")
      .then(res => setPosts(res.data))
      .catch(() => alert("게시글 불러오기 실패"));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >

      {/* -------------------- 상단바 -------------------- */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        {/* 왼쪽 로고 */}
        <img
          src="/Logo.png"
          alt="logo"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={() => navigate("/posts")}
        />

        {/* 중앙 타이틀 */}
        <h2
          style={{
            margin: 0,
            color: "#4A403A",
            fontWeight: "700",
            fontSize: "60px",
          }}
        >
          Meer-Board
        </h2>

        {/* 오른쪽 프로필 */}
        <img
          src="/profile.png"
          alt="profile"
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={() => alert("프로필 페이지 예정")}
        />
      </div>

      {/* -------------------- 구분선 -------------------- */}
      <hr
        style={{
          width: "100%",
          border: "none",
          borderTop: "1px solid #E8DCCF",
          marginBottom: "25px",
        }}
      />

      {/* -------------------- Board List 제목 (단독 라인) -------------------- */}
      <h1
        style={{
          margin: 0,
          color: "#6B4F3A",
          fontSize: "32px",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "8px", // 제목 아래 간격
        }}
      >
        Board List
      </h1>

      {/* -------------------- 게시물 작성 버튼 (오른쪽 정렬) -------------------- */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "25px",   // 버튼 아래 간격 넓힘
        }}
      >
        <button
          onClick={() => navigate("/posts/create")}
          style={{
            padding: "10px 18px",
            backgroundColor: "#D9B89C",
            color: "#4A332C",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + 게시물 작성
        </button>
      </div>

      {/* -------------------- 게시글 카드 목록 -------------------- */}
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",          // 카드 간 간격 넓힘
        }}
      >
        {posts.length === 0 ? (
          <p style={{ color: "#8A6E5A" }}>아직 게시글이 없습니다.</p>
        ) : (
          posts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/posts/${p.id}`)}
              style={{
                padding: "20px",
                backgroundColor: "rgba(255,255,255,0.85)",
                border: "1px solid #E8DCCF",
                borderRadius: "14px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h2 style={{ margin: 0, color: "#4A403A" }}>{p.title}</h2>
              <p style={{ marginTop: "8px", color: "#8A6E5A" }}>
                작성자: <b>{p.writer}</b>
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default PostList;
