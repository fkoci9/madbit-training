import { useDispatch, useSelector } from 'react-redux';
import { addComment , addNewComment } from '../redux/postSlice.tsx'; // Assuming you have a Comment type in your postSlice.tsx
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";

const CommentPage: React.FC = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();

    const comments = useSelector((state: RootState) => state.app.comments);
    const posts = useSelector((state: RootState) => state.app.posts);
    const selectedPost = posts.find((post) => post.id.toString() === postId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newComment, setNewComment] = useState({postId: postId, title: '' });
    console.log('posts' , posts);
    console.log('comments' , comments)


    useEffect(() => {
        if(comments.length === 0){
            dispatch(addComment(selectedPost?.comments));
        }
    }, [dispatch]);

    const handleAddComment = (newComment: { postId: string | undefined; title: string }) =>{
        dispatch(addNewComment(newComment));
        setIsModalOpen(false);
        setNewComment({postId: postId , title: ''})
    }

    return (
        <div>
            <h1>Comments for Post {postId}</h1>
            <button onClick={() => setIsModalOpen(true)}>Add New</button>
            {isModalOpen && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h2>Add New Comment</h2>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Enter title"
                                        value={newComment.title}
                                        onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button className="button is-primary" onClick={() => handleAddComment(newComment)}>
                                Add Comment
                            </button>
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setIsModalOpen(false)}
                    >Cancel</button>
                </div>
            )}
            <ul>
                {Array.isArray(comments[0]) &&
                    comments[0].map((comment) => (
                        <li key={comment.id}>
                            <h2>{comment.title}</h2>
                        </li>
                    ))}
            </ul>

        </div>
    );
}

export default CommentPage;
