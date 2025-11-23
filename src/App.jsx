import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register";
import PostList from "./PostList";
import PostCreate from "./PostCreate";

function App() {
  return (
    <Routes>
      {/* 로그인 / 회원가입 */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 게시판 */}
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/create" element={<PostCreate />} />
    </Routes>
  );
}

export default App;
