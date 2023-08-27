import React, { useState } from 'react';

interface AddPostModalProps {
    onClose: () => void;
    onAddPost: (title: string, content: string) => void;
}

function AddPostModal({ onClose, onAddPost }: AddPostModalProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleAddPost = () => {
        onAddPost(title, content);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add Post</h2>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={handleContentChange} />
                </div>
                <button onClick={handleAddPost}>Add Post</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AddPostModal;
