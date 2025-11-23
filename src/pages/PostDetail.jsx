// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const username = localStorage.getItem("username");
  const [liked, setLiked] = useState(false);

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

  // 게시글 조회 + 조회수 증가
  useEffect(() => {
    axios
      .get(`http://localhost:8080/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => alert("게시글 로딩 실패"));

    axios.post(`http://localhost:8080/posts/${id}/views`);
  }, [id]);

  if (!post)
    return <p style={{ textAlign: "center", marginTop: "40px" }}>로딩중...</p>;

  return (
    <>
      {/* 공통 네브바 */}
      <Navbar />

      {/* 전체 컨테이너 */}
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
          }}
        >
          {post.title}
        </h1>

        <hr />

        {/* 작성자 + 작성일 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px 0",
            color: "#6B4F3A",
            fontWeight: "600",
          }}
        >
          <span>작성자: {post.writer}</span>
          <span>작성일: {formatDate(post.createdAt)}</span>
        </div>

        <hr />

        {/* 본문 */}
        <div
          style={{
            minHeight: "200px",
            whiteSpace: "pre-wrap",
            lineHeight: "1.7",
            color: "#6B4F3A",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {post.content}
        </div>

        <hr />

        {/* 좋아요 / 댓글 / 조회 */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            color: "#6B4F3A",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          {/* ❤️ 좋아요 */}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              axios
                .post(
                  `http://localhost:8080/posts/${id}/like?username=${username}`
                )
                .then((res) => {
                  setPost(res.data);
                  setLiked(!liked);
                })
                .catch(() => alert("좋아요 실패"));
            }}
          >
            {liked ? "🤍" : "❤️" } {post.likes}
          </span>

          {/* 댓글 */}
          <span>💬 {post.commentCount}</span>

          {/* 조회수 */}
          <span>👁 {post.views}</span>
        </div>

        <hr style={{ marginTop: "25px" }} />

        {/* 댓글 영역 */}
        <h3 style={{ color: "#4A403A" }}>댓글</h3>
        <p style={{ color: "#7A6A58" }}>(댓글 기능은 곧 구현 예정)</p>
      </div>
    </>
  );
}

export default PostDetail;
