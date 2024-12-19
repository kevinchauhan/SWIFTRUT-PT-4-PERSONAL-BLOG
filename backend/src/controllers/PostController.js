import Post from '../models/Post.js';

class PostController {
    // Get all posts
    static async getAllPosts(req, res) {
        try {
            const posts = await Post.find().sort({ date: -1 });
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a specific post by ID
    static async getPostById(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Create a new post
    static async createPost(req, res) {
        const { title, content, author, tags, coverImage } = req.body;
        const newPost = new Post({
            title,
            content,
            author,
            tags,
            coverImage,
        });

        try {
            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Update an existing post by ID
    static async updatePost(req, res) {
        const { title, content, author, tags, coverImage } = req.body;
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            post.title = title || post.title;
            post.content = content || post.content;
            post.author = author || post.author;
            post.tags = tags || post.tags;
            post.coverImage = coverImage || post.coverImage;

            await post.save();
            res.json(post);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Delete a post by ID
    static async deletePost(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default PostController;
