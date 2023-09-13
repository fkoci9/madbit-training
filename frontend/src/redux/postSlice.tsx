import { createSlice} from '@reduxjs/toolkit';


export interface Comment {
    id: number;
    postId : number;
    title: string;
}

interface Post {
    id: number;
    title: string;
    author: string;
    comments: Comment[];
}
const dummyPosts:Post[] = [
    {
        id: 1,
        title: 'Post 1',
        author: 'Author 1',
        comments: [{ id: 1, postId: 1 ,title: 'Comment 1 of Post 1' },
            {id: 2 , postId: 1 ,title : 'Comment 2 of Post 1'}],
    },
    {
        id: 2,
        title: 'Post 2',
        author: 'Author 2',
        comments: [{ id: 2,postId: 2 , title: 'Comment 1 of Post 2' },
            {id: 2 ,postId: 2 , title: 'Comment 2 of Post 2'}],
    },
    {
        id: 3,
        title: 'Post 3',
        author: 'Author 3',
        comments: [{ id: 3,postId: 3 , title: 'Comment 1 of Post 3' }],
    },
    {
        id: 4,
        title: 'Post 4',
        author: 'Author 2',
        comments: [{ id: 1, postId: 4 , title: 'Comment 1 of Post 4' },
            {id: 2, postId: 4 , title: 'Comment 2 of Post 4'},
            {id: 4, postId: 4 ,title: 'Comment 3 of Post 4'},
            {id: 6,postId: 4 , title: 'Comment 4 of Post 4'}],
    },
];

interface AppState {
    posts: Post[];
    comments: Comment[];
}
const LOCAL_STORAGE_KEY = 'reduxState';
const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
const initialState: AppState = storedState ? JSON.parse(storedState) : {
    posts: dummyPosts,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },


        addNewPost: (state, action) =>{
            const newPost: Post = {
                id: state.posts.length + 1,
                title: action.payload.title,
                author: action.payload.author,
                comments: [],
            };
            state.posts.push(newPost);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));

        },
        removePost: (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post.id !== postId);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },
        editPost: (state, action) =>{
            const { postId, updatedContent} = action.payload;
            const post = state.posts.find((post) => post.id === postId);

            if (post) {
                const updatedPost = {
                    ...post,
                    title: updatedContent,
                };

                const index = state.posts.indexOf(post);
                state.posts[index] =  updatedPost;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
            }
        },
        addComment : (state , action) =>{
            state.comments.push(action.payload);
        },
        addNewComment: (state, action) => {
            const { postId, title } = action.payload;
            const selectedPostIndex = state.posts.findIndex((post) => post.id === postId);

            if (selectedPostIndex !== -1) {
                const newComment: Comment = {
                    id: state.posts[selectedPostIndex].comments.length + 1,
                    postId : postId,
                    title,
                };

                state.posts[selectedPostIndex].comments.push(newComment);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
            }
        },
        removeComment: (state, action) => {
            const { id, postId } = action.payload;
            const selectedPostIndex = state.posts.findIndex((post) => post.id === postId);
            state.posts[selectedPostIndex].comments = state.posts[selectedPostIndex].comments.filter(
                (comment) => comment.id !== id
            );
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },



    },
});

export const {
    addPost,
    addNewPost,
    removePost,
    editPost,
    addComment,
    addNewComment,
    removeComment,
} = appSlice.actions;
export default appSlice.reducer;
