// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  // ⭐ 게시글 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLikes(res.data.likes || 0);
      })
      .catch(() => alert("게시글 로딩 실패"));
  }, [id]);

  // 로딩 중
  if (!post) return <p style={{ textAlign: "center" }}>로딩중...</p>;

  // ⭐ 좋아요 토글 (프론트 임시)
  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div>

      {/* ====================== 상단바 ====================== */}
      <div
        style={{
          width: "100%",
          padding: "15px 40px",
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
        {/* 로고 → 게시글 목록 이동 */}
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

        <h2
          style={{
            margin: 0,
            fontSize: "32px",
            color: "#4A403A",
            fontWeight: "700",
          }}
        >
          Meer Board
        </h2>

        {/* 프로필 → 마이페이지 이동 */}
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

      {/* ====================== 본문 ====================== */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {/* 제목 */}
        <h1 style={{ fontSize: "32px", color: "#6B4F3A", marginTop: "30px" }}>
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
          <span>작성일: {post.createdAt}</span>
        </div>

        <hr />

        {/* 내용 */}
        <div
          style={{
            margin: "20px 0",
            whiteSpace: "pre-wrap",
            lineHeight: "1.7",
            color: "#6B4F3A",

            minHeight: "400px",  
            padding: "10px",

            overflow: "visible", 
          }}
        >
          {post.content}
        </div>

        <hr />

        {/* 좋아요/댓글/조회 */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            color: "#6B4F3A",
            fontWeight: 600,
            alignItems: "center",
          }}
        >
          {/* 좋아요 버튼 */}
          <span
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onClick={toggleLike}
          >
            {liked ? (
              <AiFillHeart size={22} color="#D97C7C" />
            ) : (
              <AiOutlineHeart size={22} color="#6B4F3A" />
            )}
            {likes}
          </span>

          <span>💬 댓글 {post.commentCount || 0}</span>
          <span>👁 조회 {post.views || 0}</span>
        </div>

        <hr style={{ marginTop: "25px" }} />

        {/* 댓글 영역 */}
        <h3 style={{ color: "#4A403A" }}>댓글</h3>
        <p style={{ color: "#7A6A58" }}>(댓글 기능은 곧 구현 예정)</p>
      </div>
    </div>
  );
}

export default PostDetail;
