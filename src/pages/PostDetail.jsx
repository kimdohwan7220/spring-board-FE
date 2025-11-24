// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function PostDetail() {
  const { id } = useParams();
  const username = localStorage.getItem("username") || "guest";
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);

  // ⭐ 날짜 포맷 함수
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

  useEffect(() => {
    const pid = Number(id);

    const likedList = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setLiked(likedList.includes(pid));

    axios
      .get(`http://localhost:8080/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => alert("게시글 로딩 실패"));

    axios.post(`http://localhost:8080/posts/${id}/views`).catch(() => {});
  }, [id]);

  const handleToggleLike = () => {
    const pid = Number(id);
    const likedList = JSON.parse(localStorage.getItem("likedPosts") || "[]");

    axios
      .post(
        `http://localhost:8080/posts/${id}/like`,
        {},
        { params: { username } }
      )
      .then((res) => {
        setPost(res.data);

        if (liked) {
          const newList = likedList.filter((v) => v !== pid);
          localStorage.setItem("likedPosts", JSON.stringify(newList));
          setLiked(false);
        } else {
          likedList.push(pid);
          localStorage.setItem("likedPosts", JSON.stringify(likedList));
          setLiked(true);
        }
      })
      .catch(() => alert("좋아요 실패"));
  };

  // ⭐ 삭제 기능
  const handleDelete = () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    axios
      .delete(`http://localhost:8080/posts/${id}`)
      .then(() => {
        alert("게시글이 삭제되었습니다.");
        navigate("/posts");
      })
      .catch(() => alert("삭제 실패"));
  };

  if (!post) {
    return <p style={{ textAlign: "center" }}>로딩중...</p>;
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {/* 제목 */}
        <h1
          style={{
            fontSize: "32px",
            color: "#6B4F3A",
            marginTop: "30px",
            fontFamily: "'Poppins','Jua',sans-serif",
          }}
        >
          {post.title}
        </h1>

        <hr />

        {/* 작성자 + 날짜 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px 0",
            color: "#6B4F3A",
            fontWeight: "600",
            fontFamily: "'Poppins','Jua',sans-serif",
          }}
        >
          <span>작성자: {post.writer}</span>
          <span>작성일: {formatDate(post.createdAt)}</span>
        </div>

        <hr />

        {/* 내용 */}
        <div
          style={{
            minHeight: "200px",
            whiteSpace: "pre-wrap",
            lineHeight: "1.7",
            color: "#6B4F3A",
            marginTop: "20px",
            marginBottom: "20px",
            fontFamily: "'Poppins','Jua',sans-serif",
          }}
        >
          {post.content}
        </div>

        {/* ⭐ 수정 / 삭제 (작성자 본인일 때만) */}
        {post.writer === username && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "10px",
              marginBottom: "25px",
            }}
          >
            <button
              onClick={() => navigate(`/posts/${id}/edit`)}
              style={{
                padding: "10px 16px",
                backgroundColor: "#C4A58A",
                color: "#4A332C",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              ✏ 수정
            </button>

            <button
              onClick={handleDelete}
              style={{
                padding: "10px 16px",
                backgroundColor: "#E77B7B",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              🗑 삭제
            </button>
          </div>
        )}

        <hr />

        {/* 좋아요 / 댓글 / 조회 */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            color: "#6B4F3A",
            fontWeight: "600",
            fontFamily: "'Poppins','Jua',sans-serif",
            cursor: "pointer",
          }}
        >
          <span onClick={handleToggleLike}>
            {liked ? "❤️" : "🤍"} {post.likes}
          </span>

          <span>💬 {post.commentCount}</span>
          <span>👁 {post.views}</span>
        </div>

        <hr style={{ marginTop: "25px" }} />

        {/* 댓글 영역 */}
        <h3
          style={{
            color: "#4A403A",
            fontFamily: "'Poppins','Jua',sans-serif",
          }}
        >
          댓글
        </h3>
        <p style={{ color: "#7A6A58", fontFamily: "'Poppins','Jua',sans-serif" }}>
          (댓글 기능은 곧 구현 예정)
        </p>
      </div>
    </>
  );
}

export default PostDetail;
