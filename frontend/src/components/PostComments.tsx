import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

interface Comment {
    id: number;
    author: string;
    text: string;
}

interface Author {
    name: string;
    accountType: string;
    photo: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    author: Author;
    comments: Comment[];
}
interface User {
    role: 'Admin' | 'User'; // You can adjust the roles as needed
}

interface PostCommentsProps {
    posts?: Post[];
    currentUserRole: User;
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>; // Add setPosts prop
}

const PostComments: React.FC<PostCommentsProps> = ({ currentUserRole, posts = [], setPosts }) => {
    const { postId } = useParams<{ postId?: string }>();
    const [editedCommentId, setEditedCommentId] = useState<number | null>(null);
    const [editedCommentText, setEditedCommentText] = useState('');


    const handleEditComment = (commentId: number, initialText: string) => {
        setEditedCommentId(commentId);
        setEditedCommentText(initialText);
    };

    const handleSaveCommentEdit = (commentId: number) => {
        const updatedPosts = posts?.map(post => {
            if (post.id === parseInt(postId as string)) {
                const updatedComments = post.comments.map(comment => {
                    if (comment.id === commentId) {
                        return { ...comment, text: editedCommentText };
                    }
                    return comment;
                });
                return { ...post, comments: updatedComments };
            }
            return post;
        });
        setPosts(updatedPosts);
        setEditedCommentId(null);
        setEditedCommentText('');
    };
    const handleDeleteComment = (commentId: number) => {
        const updatedPosts = posts?.map(post => {
            if (post.id === parseInt(postId as string)) {
                const updatedComments = post.comments.filter(comment => comment.id !== commentId);
                return { ...post, comments: updatedComments };
            }
            return post;
        });
        setPosts(updatedPosts);
    };


    // Check if postId is undefined or not a valid number
    if (!postId || isNaN(parseInt(postId))) {
        return <div>Invalid postId</div>;
    }

    // Find the post with the matching postId
    const post = posts?.find(p => p.id === parseInt(postId));

    if (!post) {
        return <div>Post not found</div>;
    }

    // ...
    return (
        <div>
            <h2>{post.title} Comments</h2>
            <ul>
                {post.comments.map(comment => (
                    <li key={comment.id}>
                        {editedCommentId === comment.id ? (
                            <div>
                            <textarea
                                value={editedCommentText}
                                onChange={e => setEditedCommentText(e.target.value)}
                            />
                                <button onClick={() => handleSaveCommentEdit(comment.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <strong>{comment.author}:</strong> {comment.text}
                                {currentUserRole.role === 'Admin' && (
                                    <div>
                                        <button onClick={() => handleEditComment(comment.id, comment.text)}>Edit</button>
                                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
// ...

};

export default PostComments;
