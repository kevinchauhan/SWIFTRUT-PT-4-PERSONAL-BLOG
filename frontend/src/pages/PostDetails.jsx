import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/posts/${id}`); // API call to fetch the post by ID
            const data = await response.json();
            setPost(data);
        };
        fetchPost();
    }, [id]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-6">
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-md mb-4"
                />
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <p className="text-sm text-gray-500 mb-2">
                    By {post.author} on {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                    Tags: {post.tags.join(', ')}
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Post Content</h2>
                <p>{post.content}</p>
            </div>

            <div>
                <a
                    href="/"
                    className="text-indigo-600 hover:underline mt-6 block"
                >
                    Back to All Posts
                </a>
            </div>
        </div>
    );
};

export default PostDetailPage;
