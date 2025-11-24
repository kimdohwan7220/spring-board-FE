<h1>🎨 React 게시판 프로젝트 - 프론트엔드</h1>

<p>
이 프로젝트는 <strong>React (Vite)</strong> 기반으로 제작된 게시판 웹 애플리케이션입니다.<br>
회원가입, 로그인, 게시물 CRUD, 댓글, 좋아요, 프로필 이미지 표시 등<br>
백엔드(Spring Boot)와 완전하게 연동됩니다.
</p>

<hr>

<h2>🖼️ 프로젝트 주요 화면 (Screenshots)</h2>


## 📸 화면 구성 (Screenshots)

### 🔐 로그인
![login](https://github.com/user-attachments/assets/c6cc171c-99be-43c7-9d14-57a50b69f1bd)

---

### 🔐 회원가입
![post-list](https://github.com/user-attachments/assets/bd82d772-3341-471e-89ee-600c24350356)

---

### 📝 게시글 목록 페이지
![post-detail](https://github.com/user-attachments/assets/58de3f50-a7a4-44c1-8b1a-9e39ab2ef06c)

---

### ➕ 게시글 작성 페이지
![post-create](https://github.com/user-attachments/assets/6908d743-690e-4808-af42-f915c8afaa4a)

---

### 🛠 게시글 상세 페이지
![post-edit](https://github.com/user-attachments/assets/45eae11e-de4f-4f9b-bd15-1c9ae4831dd3)

---

### 👤 마이페이지 (프로필)
![mypage](https://github.com/user-attachments/assets/68f0cc99-8ff1-4bd1-8390-58c6a29a6ac9)


<br>

---

<h2>🛠️ 기술 스택</h2>

<h3>Frontend</h3>
<ul>
  <li>React (Vite)</li>
  <li>React Router</li>
  <li>Axios</li>
  <li>JavaScript (ES6+)</li>
  <li>CSS</li>
</ul>

<h3>Backend 연동</h3>
<ul>
  <li>Spring Boot API</li>
  <li>JWT 없이 세션 기반(로컬스토리지 username 저장)</li>
</ul>

<hr>

<h2>📁 프로젝트 구조</h2>

<pre>
src/
 ├── components/
 │    ├── Navbar.jsx
 │    ├── ...
 │
 ├── pages/
 │    ├── Login.jsx
 │    ├── Register.jsx
 │    ├── PostList.jsx
 │    ├── PostCreate.jsx
 │    ├── PostDetail.jsx
 │    ├── MyPage.jsx
 │
 ├── api/
 │    └── axiosInstance.js   (선택)
 │
 ├── assets/
 │    └── default-profile.png
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css
</pre>

<hr>

<h2>📡 API 연동 흐름</h2>

### 🔐 Auth (회원)

- 회원가입 → `POST /auth/register`
- 로그인 → `POST /auth/login`
- 로그인 후 username 로컬스토리지 저장 → UI · 댓글 · 좋아요 기능에 사용
- 마이페이지에서 닉네임/비밀번호/프로필 이미지 변경 가능

<br>

### 📝 Post (게시물)

- 목록 조회 → `GET /posts`
- 작성 → `POST /posts`
- 수정 → `PUT /posts/{id}`
- 삭제 → `DELETE /posts/{id}`
- 좋아요 토글 → `POST /posts/{id}/like?username=...`
- 조회수 증가 → `POST /posts/{id}/views`

<br>

### 💬 Comment (댓글)

- 댓글 조회 → `GET /posts/{id}/comments`
- 작성 → `POST /posts/{id}/comments`
- 수정 → `PUT /posts/{id}/comments/{commentId}`
- 삭제 → `DELETE /posts/{id}/comments/{commentId}`
- 댓글 프로필 이미지 표시 → 백엔드가 URL 제공

<hr>

<h2>✨ 주요 특징</h2>

<ul>
  <li>✔ React Hooks 기반 상태 관리</li>
  <li>✔ Axios를 통한 백엔드 API 통신</li>
  <li>✔ 사용자 프로필 이미지 렌더링</li>
  <li>✔ 댓글 수정 모드 / 삭제 기능</li>
  <li>✔ 게시글 좋아요(❤️/🤍) 및 실시간 반영</li>
  <li>✔ 전체 페이지 공통 네비게이션 바 구현</li>
</ul>

<hr>

<h2>🚀 실행 방법</h2>

```bash
npm install
npm run dev
