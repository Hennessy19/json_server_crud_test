// src/components/PostList.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, deletePost } from '../services/api';
import Pagination from './Pagination';
import { usePostCache } from '../hooks/usePostCache';
import Loader from './Loader';
import { Post } from '../types/types';

const PostList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const { cachedPosts, setCachedPosts, invalidateCache, isCacheValid } = usePostCache();
  
  const loadPosts = useCallback(async () => {
    try {
      // Check if we already have valid cache
      if (cachedPosts.length > 0 && isCacheValid()) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const data = await fetchPosts();
      console.log('Fetched posts: ✅✅', data);
      setCachedPosts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
      setLoading(false);
    }
  }, [setCachedPosts, cachedPosts.length, isCacheValid]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      invalidateCache();
      // Filter out the deleted post from the current state
      setCachedPosts(cachedPosts.filter(post => post.id !== id));
    } catch (err) {
      setError('Failed to delete post. Please try again.');
    }
  };

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = cachedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(cachedPosts.length / postsPerPage);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="post-list-container">
      <h2>All Posts</h2>
      {currentPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <>
          <div className="posts-grid">
            {currentPosts.map((post: Post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body.substring(0, 100)}...</p>
                <div className="post-actions">
                  <Link to={`/post/${post.id}`} className="btn btn-view">View</Link>
                  <Link to={`/edit/${post.id}`} className="btn btn-edit">Edit</Link>
                  <button 
                    onClick={() => handleDelete(post.id)} 
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default PostList;