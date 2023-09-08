// src/components/EditPost.tsx

import React, { useState } from 'react';

const EditPost: React.FC<{ onEditPost: (updatedPost: { title: string; author: string }) => void }> = ({
                                                                                                          onEditPost,
                                                                                                      }) => {
    const [updatedPost, setUpdatedPost] = useState({ title: '', author: '' });

    const handleEditPost = () => {
        onEditPost(updatedPost);
        setUpdatedPost({ title: '', author: '' });
    };

    return (
        <div>
            <h2>Edit Post</h2>
            <input
                type="text"
                placeholder="New Title"
                value={updatedPost.title}
                onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="New Author"
                value={updatedPost.author}
                onChange={(e) => setUpdatedPost({ ...updatedPost, author: e.target.value })}
            />
            <button onClick={handleEditPost}>Edit</button>
        </div>
    );
};

export default EditPost;
