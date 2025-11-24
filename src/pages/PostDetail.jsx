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
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  // ⭐ 댓글 수정 상태
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  // 날짜 포맷
  const formatDate = (d) => {
    return new Date(d).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 초기 로딩
  useEffect(() => {
    axios
      .get(`http://localhost:8080/posts/${id}`, { params: { username } })
      .then((res) => setPost(res.data));

    axios
      .get(`http://localhost:8080/posts/${id}/comments`)
      .then((res) => setComments(res.data));

    axios.post(`http://localhost:8080/posts/${id}/views`).catch(() => {});
  }, [id]);

  // 댓글 작성
  const handleAddComment = () => {
    if (!commentContent.trim()) return;

    axios
      .post(`http://localhost:8080/posts/${id}/comments`, {
        writer: username,
        content: commentContent,
      })
      .then(() => {
        setCommentContent("");
        return axios.get(`http://localhost:8080/posts/${id}/comments`);
      })
      .then((res) => setComments(res.data));
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    axios
      .delete(`http://localhost:8080/posts/${id}/comments/${commentId}`)
      .then(() => axios.get(`http://localhost:8080/posts/${id}/comments`))
      .then((res) => setComments(res.data));
  };

  // 댓글 수정 저장
  const handleUpdateComment = (commentId) => {
    if (!editContent.trim()) return;

    axios
      .put(
        `http://localhost:8080/posts/${id}/comments/${commentId}`,
        { content: editContent }
      )
      .then(() => axios.get(`http://localhost:8080/posts/${id}/comments`))
      .then((res) => {
        setComments(res.data);
        setEditingId(null);
        setEditContent("");
      })
      .catch(() => alert("댓글 수정 실패"));
  };

  // 좋아요
  const handleToggleLike = () => {
    axios
      .post(
        `http://localhost:8080/posts/${id}/like`,
        {},
        { params: { username } }
      )
      .then((res) => setPost(res.data));
  };

  // 게시글 삭제
  const handleDeletePost = () => {
    if (!confirm("게시글을 삭제하시겠습니까?")) return;

    axios.delete(`http://localhost:8080/posts/${id}`).then(() => {
      alert("삭제되었습니다.");
      navigate("/posts");
    });
  };

  if (!post) return <p style={{ textAlign: "center" }}>로딩중...</p>;

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        {/* 제목 */}
        <h1 style={{ fontSize: "32px", color: "#6B4F3A", marginTop: "30px" }}>
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
          }}
        >
          {post.content}
        </div>

        {/* 수정 / 삭제 */}
        {post.writer === username && (
          <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
            <button
              onClick={() => navigate(`/posts/${id}/edit`)}
              style={{
                padding: "10px 16px",
                backgroundColor: "#C4A58A",
                color: "#4A332C",
                borderRadius: "8px",
                border: "none",
              }}
            >
              ✏ 수정
            </button>

            <button
              onClick={handleDeletePost}
              style={{
                padding: "10px 16px",
                backgroundColor: "#E77B7B",
                color: "white",
                borderRadius: "8px",
                border: "none",
              }}
            >
              🗑 삭제
            </button>
          </div>
        )}

        <hr />

        {/* 좋아요 */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "10px",
            color: "#6B4F3A",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          <span onClick={handleToggleLike}>
            {post.liked ? "❤️" : "🤍"} {post.likes}
          </span>
          <span>💬 {comments.length}</span>
          <span>👁 {post.views}</span>
        </div>

        <hr />

        {/* 댓글 입력 */}
        <h3 style={{ color: "#4A403A" }}>댓글</h3>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #D1BFA7",
            }}
          />
          <button
            onClick={handleAddComment}
            style={{
              padding: "10px 16px",
              backgroundColor: "#D9B89C",
              borderRadius: "8px",
              border: "none",
            }}
          >
            작성
          </button>
        </div>

        {/* 댓글 리스트 */}
        {comments.map((c) => (
          <div
            key={c.id}
            style={{
              padding: "12px",
              borderBottom: "1px solid #E8DCCF",
              marginBottom: "10px",
            }}
          >
            {/* 작성자 + 날짜 */}
            <b>{c.writer}</b>
            <span style={{ marginLeft: "10px", color: "#A59080" }}>
              {formatDate(c.createdAt)}
            </span>

            {/* ⭐ 수정 모드 */}
            {editingId === c.id ? (
              <div style={{ marginTop: "10px" }}>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1BFA7",
                    resize: "none",
                  }}
                />

                <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleUpdateComment(c.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#C4A58A",
                      borderRadius: "8px",
                      border: "none",
                      color: "#4A332C",
                    }}
                  >
                    저장
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditContent("");
                    }}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#E5E5E5",
                      borderRadius: "8px",
                      border: "none",
                    }}
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <p style={{ marginTop: "5px" }}>{c.content}</p>
            )}

            {/* 수정/삭제 버튼 */}
            {c.writer === username && editingId !== c.id && (
              <div>
                <button
                  onClick={() => {
                    setEditingId(c.id);
                    setEditContent(c.content);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6B4F3A",
                    cursor: "pointer",
                    fontSize: "13px",
                    marginRight: "10px",
                  }}
                >
                  수정
                </button>

                <button
                  onClick={() => handleDeleteComment(c.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default PostDetail;
