// src/components/EditPost.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPost, updatePost } from '../services/api';
import { usePostCache } from '../hooks/usePostCache';
import { PostFormData } from '../types/types';
import Loader from './Loader';

interface EditPostParams {
  id: string;
  [key: string]: string;
}

const EditPost: React.FC = () => {
  const { id } = useParams<EditPostParams>();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { invalidateCache } = usePostCache();

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const post = await fetchPost(id);
        setTitle(post.title);
        setBody(post.body);
        setLoading(false);
      } catch (err) {
        setError('Failed to load post. Please try again.');
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
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
      setSubmitting(true);
      await updatePost(id, postData);
      invalidateCache();
      navigate(`/post/${id}`);
    } catch (err) {
      setError('Failed to update post. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="form-container">
      <div className="form-navigation">
        <Link to={`/post/${id}`} className="back-link">← Back to Post</Link>
      </div>
      <h2>Edit Post</h2>
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
          disabled={submitting}
        >
          {submitting ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default EditPost;