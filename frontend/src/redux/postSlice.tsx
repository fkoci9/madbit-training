import { createSlice } from "@reduxjs/toolkit";
import png1 from "../../public/avatar/png1.jpg";
import png2 from "../../public/avatar/png2.jpg";
export interface Comment {
  id: number;
  postId: number;
  title: string;
}
interface Post {
  id: number;
  title: string;
  author: string;
  avatar: any;
  comments: Comment[];
}

const dummyPosts: Post[] = [
  {
    id: 1,
    title: "Post 1",
    author: "Author 1",
    avatar: png1,
    comments: [
      { id: 1, postId: 1, title: "Comment 1 of Post 1" },
      { id: 2, postId: 1, title: "Comment 2 of Post 1" },
    ],
  },
  {
    id: 2,
    title: "Post 2",
    author: "Author 2",
    avatar: png2,
    comments: [
      { id: 2, postId: 2, title: "Comment 1 of Post 2" },
      { id: 2, postId: 2, title: "Comment 2 of Post 2" },
    ],
  },
  {
    id: 3,
    title: "Post 3",
    author: "Author 3",
    avatar: png1,
    comments: [{ id: 3, postId: 3, title: "Comment 1 of Post 3" }],
  },
  {
    id: 4,
    title: "Post 4",
    author: "Author 2",
    avatar: png2,
    comments: [
      { id: 1, postId: 4, title: "Comment 1 of Post 4" },
      { id: 2, postId: 4, title: "Comment 2 of Post 4" },
      { id: 4, postId: 4, title: "Comment 3 of Post 4" },
      { id: 6, postId: 4, title: "Comment 4 of Post 4" },
    ],
  },
];
interface AppState {
  posts: Post[];
}

const LOCAL_STORAGE_KEY = "reduxState";
const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
const initialState: AppState = storedState
  ? JSON.parse(storedState)
  : {
      posts: dummyPosts,
    };

// @ts-ignore
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addNewPost: (state, action) => {
      const newPost: Post = {
        id: state.posts.length + 1,
        title: action.payload.title,
        author: action.payload.author,
        avatar: png1,
        comments: [],
      };
      const newState = {
        ...state,
        posts: [...state.posts, newPost],
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    },
    removePost: (state, action) => {
      const postId = action.payload;
      const newState = {
        ...state,
        posts: state.posts.filter((post) => post.id !== postId),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    },
    editPost: (state, action) => {
      const { postId, updatedContent } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        const updatedPost = {
          ...post,
          title: updatedContent,
        };
        const index = state.posts.indexOf(post);
        const newState = {
          ...state,
          posts: [
            ...state.posts.slice(0, index),
            updatedPost,
            ...state.posts.slice(index + 1),
          ],
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
        return newState;
      }
    },
    addNewComment: (state, action) => {
      const { postId, title } = action.payload;
      const selectedPostIndex = state.posts.findIndex(
        (post) => post.id === postId,
      );
      if (selectedPostIndex !== -1) {
        const newComment: Comment = {
          id: state.posts[selectedPostIndex].comments.length + 1,
          postId: postId,
          title,
        };
        const updatedPost = {
          ...state.posts[selectedPostIndex],
          comments: [...state.posts[selectedPostIndex].comments, newComment],
        };
        const newState = {
          ...state,
          posts: [
            ...state.posts.slice(0, selectedPostIndex),
            updatedPost,
            ...state.posts.slice(selectedPostIndex + 1),
          ],
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
        return newState;
      }
      return state;
    },
    removeComment: (state, action) => {
      const { id, postId } = action.payload;
      const selectedPostIndex = state.posts.findIndex(
        (post) => post.id === postId,
      );
      if (selectedPostIndex !== -1) {
        const updatedComments = state.posts[selectedPostIndex].comments.filter(
          (comment) => comment.id !== id,
        );
        const updatedPost = {
          ...state.posts[selectedPostIndex],
          comments: updatedComments,
        };
        const newState = {
          ...state,
          posts: [
            ...state.posts.slice(0, selectedPostIndex),
            updatedPost,
            ...state.posts.slice(selectedPostIndex + 1),
          ],
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
        return newState;
      }
      return state;
    },
    editComment: (state, action) => {
      const { id, postId, updatedContent } = action.payload;
      const selectedPostIndex = state.posts.findIndex(
        (post) => post.id === postId,
      );
      const selectedCommentIndex = state.posts[
        selectedPostIndex
      ].comments.findIndex((comment) => comment.id === id);
      if (selectedPostIndex !== -1) {
        const selectedComment = state.posts[selectedPostIndex].comments.find(
          (comment) => comment.id === id,
        );
        const updatedComment = {
          ...selectedComment,
          title: updatedContent,
        };
        const newState = {
          ...state,
          posts: [
            ...state.posts.slice(0, selectedPostIndex),

            {
              ...state.posts[selectedPostIndex],
              comments: [
                ...state.posts[selectedPostIndex].comments.slice(
                  0,
                  selectedCommentIndex,
                ),
                updatedComment,
                ...state.posts[selectedPostIndex].comments.slice(
                  selectedCommentIndex + 1,
                ),
              ],
            },

            ...state.posts.slice(selectedPostIndex + 1),
          ],
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
        console.log(newState);
        return newState;
      }
    },
  },
});

export const {
  addNewPost,
  removePost,
  editPost,
  addNewComment,
  removeComment,
  editComment,
} = appSlice.actions;
export default appSlice.reducer;
