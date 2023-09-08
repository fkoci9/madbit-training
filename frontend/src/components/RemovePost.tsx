// src/components/RemovePost.tsx

import React from 'react';

const RemovePost: React.FC<{ onRemovePost: () => void }> = ({ onRemovePost }) => {
    return (
        <div>
            <h2>Remove Post</h2>
            <button onClick={onRemovePost}>Remove</button>
        </div>
    );
};

export default RemovePost;
