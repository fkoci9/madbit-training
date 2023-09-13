import { useDispatch, useSelector } from 'react-redux';
import {addComment, addNewComment, removeComment} from '../redux/postSlice.tsx'; // Assuming you have a Comment type in your postSlice.tsx
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";

const CommentPage: React.FC = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.app.posts);
    const selectedPostIndex = posts.findIndex((post) => post.id.toString() === postId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newComment, setNewComment] = useState({ title: '' });
    console.log('posts' , posts);
    const comments = useSelector((state: RootState) => state.app.posts[selectedPostIndex].comments);
    console.log('comments' , comments)

    useEffect(()=>{
        if(comments.length === 0){
            dispatch(addComment(comments));
        }
    },[dispatch, comments])
    const handleAddComment = () => {
        const commentToAdd = { postId: postId, title: newComment.title };
        dispatch(addNewComment(commentToAdd));
        setIsModalOpen(false);
        setNewComment({ title: '' });
    }

    const handleRemoveComment = (id: number) => {
        dispatch(removeComment({ id, postId: Number(postId) }));
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
                            <button className="button is-primary" onClick={() => handleAddComment()}>
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
                {comments.map((comment) => (
                        <li key={comment.id}>
                            <h2>{comment.title}</h2>
                            <button onClick={() => handleRemoveComment(comment.id)}>Remove</button>
                        </li>
                    ))}
            </ul>

        </div>
    );
}

export default CommentPage;
