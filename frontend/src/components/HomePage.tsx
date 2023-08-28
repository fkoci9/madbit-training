import {useEffect, useState} from 'react';
import AddPostModal from './AddPostModal';
import EditPost from "./EditPost.tsx";
import {UserRole} from './Auth.tsx'
import RemovePost from "./RemovePost.tsx";
import avatar_147142 from '../assets/avatar_147142.png';
import avatar_168732 from '../assets/avatar_168732.png'
interface Post {
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
        accountType: string;
        photo: string;
    };
    comments: number;
}

const dummyPosts: Post[] = [
    {
        id: 1,
        title: 'First Post',
        content: 'This is the content of the first post.',
        author: {
            name: 'John Doe',
            accountType: 'Premium',
            photo: avatar_147142, // Replace with actual file path
        },
        comments: 3,
    },
    {
        id: 2,
        title: 'Second Post',
        content: 'This is the content of the second post.',
        author: {
            name: 'Jane Smith',
            accountType: 'Basic',
            photo: avatar_168732, // Replace with actual file path
        },
        comments: 5,
    },
    {
        id: 3,
        title: 'Third Post',
        content: 'This is the content of the third post.',
        author: {
            name: 'Alice Johnson',
            accountType: 'Premium',
            photo: avatar_147142, // Replace with actual file path
        },
        comments: 2,
    },
    {
        id: 4,
        title: 'Fourth Post',
        content: 'This is the content of the fourth post.',
        author: {
            name: 'Bob Brown',
            accountType: 'Basic',
            photo: avatar_168732, // Replace with actual file path
        },
        comments: 0,
    },
    {
        id: 5,
        title: 'Fifth Post',
        content: 'This is the content of the fifth post.',
        author: {
            name: 'Eve White',
            accountType: 'Premium',
            photo: avatar_147142, // Replace with actual file path
        },
        comments: 7,
    },
];

function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editPostId, setEditPostId] = useState<number | null>(null);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const [removePostId, setRemovePostId] = useState<number | null>(null);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts') || JSON.stringify(dummyPosts));
        setPosts(savedPosts);
    }, []);

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEditPost = (postId: number) => {
        setEditPostId(postId); // Set the post id being edited
    };
    const handleEditPostSave = (postId: number, newTitle: string, newContent: string) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return { ...post, title: newTitle, content: newContent };
            }
            return post;
        });
        setPosts(updatedPosts);
        setEditPostId(null);
    };

    const handleConfirmRemovePost = (postId: number) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        setRemovePostId(null);
    };

    const handleAddPost = (title: string, content: string) => {
        const newPost: Post = {
            id: Date.now(),
            title,
            content,
            author: {
                name: 'John Doe',
                accountType: 'Premium',
                photo: avatar_147142
            },
            comments: 0,
        };
        setPosts([...posts, newPost]);
        closeModal();
    };


    return (
        <div>
            <h2>Home Page</h2>
            <button onClick={openModal}>Add Post</button>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <div>
                                <img src={post.author.photo} alt={post.author.name} />
                                <p>{post.author.name}</p>
                                <p>Account Type: {post.author.accountType}</p>
                                <p>Comments: {post.comments}</p>
                            </div>
                            {currentUser && currentUser.role === UserRole.Admin && (
                                <div>
                                    <button onClick={() => handleEditPost(post.id)}>Edit</button>
                                    <button onClick={() => handleConfirmRemovePost(post.id)}>Remove</button>
                                </div>
                            )}
                            <button>View Details Button will be here</button>
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && <AddPostModal onClose={closeModal} onAddPost={handleAddPost} />}
            {editPostId !== null && (
                <EditPost
                    postId={editPostId}
                    onClose={() => setEditPostId(null)}
                    onEditPost={handleEditPostSave}
                />
            )}
            {removePostId !== null && (
                <RemovePost
                    postId={removePostId}
                    onClose={() => setRemovePostId(null)}
                    onConfirmRemove={handleConfirmRemovePost}
                />
            )}
        </div>
    );
}

export default HomePage;
