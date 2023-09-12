import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.tsx';
import { editPost, removePost, addPost , addNewPost } from '../redux/postSlice.tsx';
import { logout } from "../redux/authSlice.tsx";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.app.posts);
    console.log(posts);
    const navigate = useNavigate();
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', author: '' });
    const [editedTitle, setEditedTitle] = useState('');

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(addPost(posts));
        }
    }, [dispatch, posts]);

    const handleAddPost = () => {
        dispatch(addNewPost(newPost));
        setIsModalOpen(false); // Close the modal after adding a new post
        setNewPost({ title: '', author: '' }); // Clear input fields
    };

    const handleRemovePost = (postId: number) => {
        dispatch(removePost(postId));
    };

    const handleEditPost = (postId: number) => {
        setEditingPostId(postId);
        // Set the edited title to the current post's title
        const postToEdit = posts.find((post) => post.id === postId);
        if (postToEdit) {
            setEditedTitle(postToEdit.title);
        }
    };

    const handleSavePost = (postId: number , editedTitle : string) => {
        dispatch(editPost({ postId, updatedContent : editedTitle }));
        setEditingPostId(null)
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
            <button onClick={() => setIsModalOpen(true)}>Add New</button>
            {isModalOpen && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h2>Add New Post</h2>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Enter title"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Author</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Enter author"
                                        value={newPost.author}
                                        onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button className="button is-primary" onClick={handleAddPost}>
                                Add Post
                            </button>
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setIsModalOpen(false)}
                    ></button>
                </div>
            )}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {currentUserType === 'admin' && editingPostId === post.id ? (
                            <>
                                <div>
                                    {/* Use the editedTitle in the input field */}
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                    />
                                </div>
                                <button onClick={() => handleSavePost(post.id , editedTitle)}>Save</button>
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
