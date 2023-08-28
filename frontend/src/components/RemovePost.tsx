interface RemovePostProps {
    postId: number;
    onClose: () => void;
    onConfirmRemove: (postId: number) => void;
}

function RemovePost({ postId, onClose, onConfirmRemove }: RemovePostProps) {
    const handleConfirm = () => {
        onConfirmRemove(postId);
        onClose();
    };

    return (
        <div className="remove-post-modal">
            <h3>Confirm Removal</h3>
            <p>Are you sure you want to remove this post?</p>
            <button onClick={handleConfirm}>Remove</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default RemovePost;
