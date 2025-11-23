import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostList from "./pages/PostList";
import PostCreate from "./pages/PostCreate";
import PostDetail from "./pages/PostDetail"; 
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/create" element={<PostCreate />} />

      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/mypage" element={<MyPage />} />  
    </Routes>
  );
}

export default App;
