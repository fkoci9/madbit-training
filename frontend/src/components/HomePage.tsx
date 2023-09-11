import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.tsx';
import { editPost, removePost, addPost } from '../redux/postSlice.tsx';
import { logout } from "../redux/authSlice.tsx";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.app.posts);
    console.log(posts);
    const navigate = useNavigate();
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(addPost(posts));
        }
    }, [dispatch, posts]);

    const handleRemovePost = (postId: number) => {
        dispatch(removePost(postId));
    };

    const handleEditPost = (postId: number) => {
        setEditingPostId(postId);
    };

    const handleSavePost = (postId: number, updatedContent: string) => {
        dispatch(editPost({ postId, updatedContent }));
        setEditingPostId(null);
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

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {currentUserType === 'admin' && editingPostId === post.id ? (
                            <>
                                <div>
                                    <input
                                        type="text"
                                        value={post.title}
                                        onChange={(e) => handleSavePost(post.id, e.target.value)}
                                    />
                                </div>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : null}
                        <h2>{post.title}</h2>
                        <p>Author: {post.author}</p>
                        {currentUserType === 'admin' ? (
                            <>
                                <button onClick={() => handleRemovePost(post.id)}>Remove</button>
                                <button onClick={() => handleEditPost(post.id)}>Edit</button>
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
