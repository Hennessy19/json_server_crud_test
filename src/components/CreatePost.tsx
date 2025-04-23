// src/components/CreatePost.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../services/api';
import { usePostCache } from '../hooks/usePostCache';
import { PostFormData } from '../types/types';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { invalidateCache } = usePostCache();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      setError('Title and body are required');
      return;
    }

    const postData: PostFormData = {
      title,
      body,
      userId: 1 
    };

    try {
      setLoading(true);
      await createPost(postData);
      invalidateCache();
      navigate('/');
    } catch (err) {
      setError('Failed to create post. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-navigation">
        <Link to="/" className="back-link">← Back to Posts</Link>
      </div>
      <h2>Create New Post</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Content</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post content"
            rows={6}
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-submit"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
