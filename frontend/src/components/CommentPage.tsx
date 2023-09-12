import { useDispatch, useSelector } from 'react-redux';
import { addComment , addNewComment} from '../redux/postSlice.tsx'; // Assuming you have a Comment type in your postSlice.tsx
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";

const CommentPage: React.FC = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState('');
    const comments = useSelector((state: RootState) => state.app.comments);
    const posts = useSelector((state: RootState) => state.app.posts);
    const selectedPost = posts.find((post) => post.id.toString() === postId);
    console.log('posts' , posts);
    console.log('comments' , comments)


    useEffect(() => {
        dispatch(addComment(selectedPost?.comments));
    }, [dispatch]);

    const handleAddNewComment = () => {
        if (newComment && selectedPost) {
            dispatch(addNewComment({ postId: selectedPost.id, text: newComment }));
            setNewComment('');
        }
    };

    return (
        <div>
            <h1>Comments for Post {postId}</h1>
            <ul>
                {Array.isArray(comments[0]) &&
                    comments[0].map((comment) => (
                        <li key={comment.id}>
                            <h2>{comment.title}</h2>
                        </li>
                    ))}
            </ul>
            <button onClick={handleAddNewComment}>add new</button>
        </div>
    );
}

export default CommentPage;
