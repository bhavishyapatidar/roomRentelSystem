import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ params }) => {
  try {
    const res = await apiRequest(`/posts/${params.id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    throw new Response("Failed to fetch post", { status: 500 });
  }
};

export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1] || "";
  try {
    const postPromise = apiRequest(`/posts?${query}`);
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error("Error fetching posts list:", error);
    throw new Response("Failed to fetch posts list", { status: 500 });
  }
};

export const profilePageLoader = async () => {
  try {
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chats");
    return defer({
      postResponse: postPromise,
      chatResponse: chatPromise,
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw new Response("Failed to fetch profile data", { status: 500 });
  }
};
