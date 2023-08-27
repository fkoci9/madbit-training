import {useEffect, useState} from 'react';
import AddPostModal from './AddPostModal';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    accountType: string;
    comments: number;
}
const dummyPosts: Post[] = [
    {
        id: 1,
        title: 'First Post',
        content: 'This is the content of the first post.',
        author: 'John Doe',
        accountType: 'Premium',
        comments: 3,
    },
    {
        id: 2,
        title: 'Second Post',
        content: 'This is the content of the second post.',
        author: 'Jane Smith',
        accountType: 'Basic',
        comments: 5,
    },
    {
        id: 3,
        title: 'Third Post',
        content: 'This is the content of the third post.',
        author: 'Alice Johnson',
        accountType: 'Premium',
        comments: 2,
    },
    {
        id: 4,
        title: 'Fourth Post',
        content: 'This is the content of the fourth post.',
        author: 'Bob Brown',
        accountType: 'Basic',
        comments: 0,
    },
    {
        id: 5,
        title: 'Fifth Post',
        content: 'This is the content of the fifth post.',
        author: 'Eve White',
        accountType: 'Premium',
        comments: 7,
    },
];


function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleAddPost = (title: string, content: string) => {
        const newPost: Post = {
            id: Date.now(),
            title,
            content,
            author: 'John Doe', // Replace with actual author name
            accountType: 'Premium', // Replace with actual account type
            comments: 0, // Initial comment count
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
                        <h3>{post.title + " -- Author : " + post.author}</h3>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
            {isModalOpen && <AddPostModal onClose={closeModal} onAddPost={handleAddPost} />}
        </div>
    );
}

export default HomePage;
