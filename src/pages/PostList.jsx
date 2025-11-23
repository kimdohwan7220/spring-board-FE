// src/pages/PostList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")
      .then((res) => setPosts(res.data))
      .catch(() => alert("게시글 불러오기 실패"));
  }, []);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
      {/* 상단바 */}
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
        {/* 로고 */}
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

        <h2
          style={{
            margin: 0,
            color: "#4A403A",
            fontWeight: "700",
            fontSize: "40px",
          }}
        >
          Meer-Board
        </h2>

        {/* 프로필 */}
        <img
          src="/profile.png"
          alt="profile"
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </div>

      {/* 구분선 */}
      <hr
        style={{
          width: "100%",
          border: "none",
          borderTop: "1px solid #E8DCCF",
          marginBottom: "20px",
        }}
      />

      {/* Board List 제목 */}
      <h1
        style={{
          margin: 0,
          color: "#6B4F3A",
          fontSize: "60px",
          marginBottom: "8px",
        }}
      >
        Board List
      </h1>

      {/* 게시물 작성 버튼 */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "25px",
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

      {/* 게시글 카드 목록 */}
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
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
              {/* 제목 */}
              <h2 style={{ margin: 0, color: "#4A403A" }}>{p.title}</h2>

              {/* 작성자 */}
              <p
                style={{
                  marginTop: "6px",
                  color: "#8A6E5A",
                  fontSize: "14px",
                }}
              >
                작성자: <b>{p.writer}</b>
              </p>

              {/* 좋아요 / 댓글 / 조회 + 작성일 → 양쪽 정렬 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between", // ⭐ 핵심
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                {/* 왼쪽 - 좋아요/댓글/조회 */}
                <div
                  style={{
                    display: "flex",
                    gap: "18px",
                    color: "#B28A72",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  <span>❤️ {p.likes || 0}</span>
                  <span>💬 {p.commentCount || 0}</span>
                  <span>👁 {p.views || 0}</span>
                </div>

                {/* 오른쪽 - 작성일 */}
                <span
                  style={{
                    fontSize: "13px",
                    color: "#B28A72",
                  }}
                >
                  {formatDate(p.createdAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostList;
