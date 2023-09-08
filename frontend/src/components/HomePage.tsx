import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store.tsx';
import {editPost, removePost, setPosts} from '../redux/postSlice.tsx';
import AddPost from './AddPost.tsx';
import EditPost from './EditPost.tsx';
import {dummyPosts} from "./dummyData.tsx";

const loadPostsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('posts') || '[]');
};

const savePostsToLocalStorage = (posts: any) => {
    localStorage.setItem('posts', JSON.stringify(posts));
};

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.posts.posts);

    const [editingPostId, setEditingPostId] = useState<number | null>(null); // Track the post being edited
    const [updatedPost, setUpdatedPost] = useState({ title: '', author: '' });

    useEffect(() => {
        // Load posts from local storage when the component initializes
        const loadedPosts = loadPostsFromLocalStorage();

        // If there are no posts in local storage, use the dummyPosts as initial data
        if (loadedPosts.length === 0) {
            dispatch(setPosts(dummyPosts));
            savePostsToLocalStorage(dummyPosts);
        } else {
            dispatch(setPosts(loadedPosts));
        }
    }, [dispatch]);
    const handleAddPost = (newPost: { title: string; author: string }) => {
        // Implement logic to add a new post
        // For an admin, you can directly add a new post to the posts array
        const adminNewPost = { ...newPost, id: posts.length + 1 };
        const updatedPosts = [adminNewPost, ...posts];
        dispatch(setPosts(updatedPosts));

        // Save posts to local storage
        savePostsToLocalStorage(updatedPosts);
    };

    const handleRemovePost = (postId: number) => {
        // Dispatch the removePost action with the postId
        dispatch(removePost(postId));

        // Update local storage after removing a post
        const updatedPosts = posts.filter((post) => post.id !== postId);
        savePostsToLocalStorage(updatedPosts);
    };

    const handleEditPost = (postId: number, updatedTitle: string, updatedAuthor: string) => {
        // Find the post by its id
        const postToEdit = posts.find((post) => post.id === postId);

        if (postToEdit) {
            // Create an updated post object with the new title and author
            const updatedPost = {
                ...postToEdit,
                title: updatedTitle,
                author: updatedAuthor,
            };

            // Dispatch the editPost action with the postId and updatedPost
            dispatch(editPost({ id: postId, updatedPost }));
            setEditingPostId(null); // Exit edit mode after saving
        }
    };


    const handleSaveEdit = () => {
        // Dispatch the editPost action with the postId and updatedPost
        if (editingPostId !== null) {
            dispatch(editPost({ id: editingPostId, updatedPost }));
            setEditingPostId(null); // Exit edit mode after saving
        }
    };

    const handleCancelEdit = () => {
        // Cancel edit mode and reset the updatedPost
        setEditingPostId(null);
        setUpdatedPost({ title: '', author: '' });
    };


    return (
        <div>
            <h1>Home Page</h1>
            <AddPost onAddPost={handleAddPost} />
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {editingPostId === post.id ? ( // Render edit fields only for the editing post
                            <>
                                <EditPost onEditPost={handleSaveEdit} /> {/* Render the EditPost component */}
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h2>{post.title}</h2>
                                <p>Author: {post.author}</p>
                                <button onClick={() => handleRemovePost(post.id)}>Remove</button>
                                <button onClick={() => handleEditPost(post.id)}>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
