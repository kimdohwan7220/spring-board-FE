import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const fetchPosts = () =>
  axios.get(`${BASE_URL}/posts`);

export const createPost = (data) =>
  axios.post(`${BASE_URL}/posts`, data);
