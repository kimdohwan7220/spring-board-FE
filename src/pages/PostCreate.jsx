import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/posts", {
      title,
      writer,
      content,
    })
      .then(() => {
        alert("게시글이 등록되었습니다!");
        navigate("/");  // 목록으로 이동
      })
      .catch(() => {
        alert("등록 실패!");
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>✏ 게시글 작성</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>제목</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>작성자</label>
          <br />
          <input
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>내용</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{
              width: "100%",
              height: "150px",
              padding: "8px",
              marginTop: "5px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          등록하기
        </button>
      </form>
    </div>
  );
}

export default PostCreate;
