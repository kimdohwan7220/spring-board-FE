import { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>게시글 목록</h2>

      {posts.length === 0 && <p>아직 게시글이 없습니다.</p>}

      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <strong>{p.title}</strong> — {p.writer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
