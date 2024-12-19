import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostFormPage = () => {
    const { id } = useParams(); // Retrieve post ID from the route, if any
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Fetch post details if editing
    useEffect(() => {
        if (id) {
            setIsEditing(true);
            // Simulate fetching post details (replace with actual API call)
            const fetchPost = async () => {
                const response = await fetch(`/api/posts/${id}`); // Replace with your backend API route
                const post = await response.json();
                setTitle(post.title);
                setContent(post.content);
            };
            fetchPost();
        }
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, content };

        if (isEditing) {
            // Update existing post
            await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });
        } else {
            // Create new post
            await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });
        }

        navigate('/'); // Redirect to the home page
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                {isEditing ? 'Edit Post' : 'Create a New Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full py-1 px-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="8"
                        className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className='text-end'>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        {isEditing ? 'Update Post' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div >
    );
};

export default PostFormPage;
