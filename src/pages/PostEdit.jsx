import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 기존 글 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(() => alert("게시글 로딩 실패"));
  }, [id]);

  // 수정 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/posts/${id}`, {
        title,
        content,
      })
      .then(() => {
        alert("게시글이 수정되었습니다!");
        navigate(`/posts/${id}`);
      })
      .catch(() => alert("수정 실패"));
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "700px",
          margin: "40px auto",
          padding: "25px",
          background: "rgba(255,255,255,0.9)",
          borderRadius: "14px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          fontFamily: "'Poppins','Jua',sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#4A403A", marginBottom: "20px" }}>
          📝 게시물 수정
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#6B4F3A", fontWeight: "600" }}>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #D1BFA7",
                marginTop: "5px",
                backgroundColor: "#FFFDF9",
                color: "#4A403A",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#6B4F3A", fontWeight: "600" }}>내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{
                width: "100%",
                height: "180px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #D1BFA7",
                marginTop: "5px",
                backgroundColor: "#FFFDF9",
                color: "#4A403A",
                resize: "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#D9B89C",
              color: "#4A332C",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            수정 완료
          </button>
        </form>
      </div>
    </>
  );
}

export default PostEdit;
