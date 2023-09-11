import React, { useState } from 'react';
interface EditPostProps {
    postId: number;
    title: string;
    author: string;
    onEditPost: (postId: number, updatedTitle: string, updatedAuthor: string) => void;
}

const EditPost: React.FC<EditPostProps> = ({ postId, title, author, onEditPost }) => {
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedAuthor, setUpdatedAuthor] = useState(author);

    const handleEditPost = () => {
        onEditPost(postId, updatedTitle, updatedAuthor);
    };

    return (
        <div>
            <h2>Edit Post</h2>
            <input
                type="text"
                placeholder="New Title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="New Author"
                value={updatedAuthor}
                onChange={(e) => setUpdatedAuthor(e.target.value)}
            />
            <button onClick={handleEditPost}>Save</button>
        </div>
    );
};

export default EditPost;
