import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            const fetchPost = async () => {
                const response = await fetch(`/api/posts/${id}`);
                const post = await response.json();
                setTitle(post.title);
                setContent(post.content);
                setAuthor(post.author);
                setTags(post.tags.join(', '));
                setCoverImage(post.coverImage);
            };
            fetchPost();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title,
            content,
            author,
            tags: tags.split(',').map((tag) => tag.trim()),
            coverImage,
        };

        if (isEditing) {
            await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });
        } else {
            await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });
        }

        navigate('/');
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
                        className="px-2 py-1 w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="px-2 py-1 w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="px-2 py-1 w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                        Cover Image URL
                    </label>
                    <input
                        type="text"
                        id="coverImage"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        className="px-2 py-1 w-full border-gray-300 rounded-md shadow-sm"
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
                        rows="6"
                        className="px-2 py-1 w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    {isEditing ? 'Update Post' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default PostFormPage;
