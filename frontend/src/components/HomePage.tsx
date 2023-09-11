import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store.tsx';
import {editPost, removePost, setPosts} from '../redux/postSlice.tsx';
import AddPost from './AddPost.tsx';
import EditPost from './EditPost.tsx';
import {logout} from "../redux/authSlice.tsx";
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

const loadPostsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('posts') || '[]');
};

const savePostsToLocalStorage = (posts: any) => {
    localStorage.setItem('posts', JSON.stringify(posts));
};
interface Props {
    posts: {
        id: number;
        title: string;
        author: string;
        comments: { id: number; title: string }[];
    }[];
}

const HomePage: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.posts.posts);
    const navigate = useNavigate();
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    useEffect(() => {

        const loadedPosts = loadPostsFromLocalStorage();
        if (loadedPosts.length === 0) {
            dispatch(setPosts(props.posts));
            savePostsToLocalStorage(props.posts);
        } else {
            dispatch(setPosts(loadedPosts));
        }
    }, [dispatch , props.posts]);
    const handleAddPost = (newPost: { title: string; author: string }) => {
        const maxId = Math.max(...posts.map((post) => post.id), 0);
        const adminNewPost = { ...newPost, id: maxId + 1 };
        const updatedPosts = [adminNewPost, ...posts];
        dispatch(setPosts(updatedPosts));
        savePostsToLocalStorage(updatedPosts);
    };

    const handleRemovePost = (postId: number) => {
        dispatch(removePost(postId));
        const updatedPosts = posts.filter((post) => post.id !== postId);
        savePostsToLocalStorage(updatedPosts);
    };

    const handleEditPost = (postId: number, updatedTitle: string, updatedAuthor: string) => {
        const postToEdit = posts.find((post) => post.id === postId);

        if (postToEdit) {
            const updatedPost = {
                ...postToEdit,
                title: updatedTitle,
                author: updatedAuthor,
            };

            dispatch(editPost({ id: postId, updatedPost }));
            const updatedPosts = posts.map((post) =>
                post.id === postId ? { ...post, title: updatedTitle, author: updatedAuthor } : post
            );
            savePostsToLocalStorage(updatedPosts);
            setEditingPostId(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const currentUserType = currentUser.type || 'user';

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleLogout}>Log Out</button>
            <AddPost onAddPost={handleAddPost} />
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {currentUserType === 'admin' && editingPostId === post.id ? (
                            <>
                                <EditPost
                                    postId={post.id}
                                    title={post.title}
                                    author={post.author}
                                    onEditPost={handleEditPost}
                                />
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : null}
                        <h2>{post.title}</h2>
                        <p>Author: {post.author}</p>
                        {currentUserType === 'admin' ? (
                            <>
                                <button onClick={() => handleRemovePost(post.id)}>Remove</button>
                                <button onClick={() => setEditingPostId(post.id)}>Edit</button>
                                <Link to={`/comments/${post.id}`}>View Comments</Link>
                            </>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
