// src/components/PostDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPost, fetchComments, deletePost } from '../services/api';
import { Post, Comment } from '../types/types';
import Loader from './Loader';

interface PostDetailParams {
  id: string;
  [key: string]: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<PostDetailParams>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPostAndComments = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [postData, commentsData] = await Promise.all([
          fetchPost(id),
          fetchComments(id)
        ]);
        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load post details. Please try again.');
        setLoading(false);
      }
    };

    loadPostAndComments();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await deletePost(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete post. Please try again.');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div className="error-message">Post not found</div>;

  return (
    <div className="post-detail-container">
      <div className="post-navigation">
        <Link to="/" className="back-link">← Back to Posts</Link>
      </div>
      <div className="post-content">
        <h2>{post.title}</h2>
        <p className="post-body">{post.body}</p>
        <div className="post-actions">
          <Link to={`/edit/${post.id}`} className="btn btn-edit">Edit</Link>
          <button onClick={handleDelete} className="btn btn-delete">Delete</button>
        </div>
      </div>
      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <h4>{comment.name}</h4>
                <p className="comment-email">{comment.email}</p>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;