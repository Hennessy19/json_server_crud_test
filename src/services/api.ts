// src/services/api.ts
import { Post, Comment, PostFormData } from '../types/types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Cache time in milliseconds (5 minutes)
export const CACHE_TIME = 5 * 60 * 1000;

// Helper function for API requests
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Fetch all posts
export const fetchPosts = (): Promise<Post[]> => {
  return apiRequest<Post[]>('/posts');
};

// Fetch a single post by ID
export const fetchPost = (id: string | number): Promise<Post> => {
  return apiRequest<Post>(`/posts/${id}`);
};

// Fetch comments for a post
export const fetchComments = (postId: string | number): Promise<Comment[]> => {
  return apiRequest<Comment[]>(`/posts/${postId}/comments`);
};

// Create a new post
export const createPost = (postData: PostFormData): Promise<Post> => {
  return apiRequest<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
};

// Update an existing post
export const updatePost = (id: string | number, postData: PostFormData): Promise<Post> => {
  return apiRequest<Post>(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  });
};

// Delete a post
export const deletePost = (id: string | number): Promise<{}> => {
  return apiRequest<{}>(`/posts/${id}`, {
    method: 'DELETE',
  });
};