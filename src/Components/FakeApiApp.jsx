import  { useState, useEffect } from 'react';
import PostsContainer from './PostsContainer';
import PostForm from './PostForm';

const FakeApiApp = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({ title: '', body: '' });

    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const posts = await response.json();
                setData(posts.reverse()); 
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prev) => ({ ...prev, [name]: value }));
    };

    
    const handleAddPost = () => {
        const post = {
            id: data.length + 1,
            ...newPost
        };
        setData([post, ...data]); 
        setNewPost({ title: '', body: '' }); 
    };

    return (
        <div>
            <h1>Fake API Post Platform</h1>
            <PostForm
                title={newPost.title}
                body={newPost.body}
                onInputChange={handleInputChange}
                onAddPost={handleAddPost}
            />
            {loading ? <p>Loading posts...</p> : <PostsContainer posts={data} />}

        </div>
    );
};

export default FakeApiApp;
