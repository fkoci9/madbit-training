import React, { useState } from 'react';
import '../style/add-post.css'

interface EditPostModalProps {
    postId: number;
    onClose: () => void;
    onEditPost: (postId: number, newTitle: string, newContent: string) => void;
}

function EditPost({ postId, onClose, onEditPost }: EditPostModalProps) {
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(true);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent(event.target.value);
    };

    const handleSubmit = () => {
        onEditPost(postId, newTitle, newContent);
        onClose();
        setIsModalVisible(false);
    };

    return (
        <div className={`modal ${isModalVisible ? 'show' : ''}`}>
            <div className="modal-content">
                <h2>Edit Post</h2>
                <div>
                    <label>Title:</label>
                    <input type="text" value={newTitle} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={newContent} onChange={handleContentChange} />
                </div>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default EditPost;
