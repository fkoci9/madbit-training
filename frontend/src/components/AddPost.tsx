import React, { useState } from 'react';

const AddPost: React.FC<{ onAddPost: (post: { title: string; author: string }) => void }> = ({
                                                                                                 onAddPost,
                                                                                             }) => {
    const [newPost, setNewPost] = useState({ title: '', author: '' });
    const [error, setError] = useState('');

    const handleAddPost = () => {
        if (newPost.title.trim() === '' || newPost.author.trim() === '') {
            setError('Please fill in both title and author fields.');
            return;
        }

        onAddPost(newPost);
        setNewPost({ title: '', author: '' });
        setError('');
    };

    return (
        <div>
            <h2>Add Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Author"
                value={newPost.author}
                onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
            />
            <button onClick={handleAddPost}>Add</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AddPost;
