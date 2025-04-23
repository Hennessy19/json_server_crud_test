// src/hooks/usePostCache.ts
import { useState, useEffect } from 'react';
import { Post } from '../types/types';
import { CACHE_TIME } from '../services/api';

// Cache key for localStorage
const POSTS_CACHE_KEY = 'posts_cache';
const CACHE_TIMESTAMP_KEY = 'posts_cache_timestamp';

export interface PostCacheHook {
  cachedPosts: Post[];
  setCachedPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  invalidateCache: () => void;
  isCacheValid: () => boolean;
}

export function usePostCache(): PostCacheHook {
  const [cachedPosts, setCachedPosts] = useState<Post[]>([]);

  // Check if cache is valid
  const isCacheValid = (): boolean => {
    const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (cacheTimestamp) {
      const now = new Date().getTime();
      const timestamp = parseInt(cacheTimestamp, 10);
      
      // Check if cache is still valid
      if (now - timestamp < CACHE_TIME) {
        return true;
      }
    }
    return false;
  };

  // Load posts from cache on initial render
  useEffect(() => {
    const loadFromCache = () => {
      const cachedData = localStorage.getItem(POSTS_CACHE_KEY);
      
      if (cachedData && isCacheValid()) {
        try {
          const parsedData = JSON.parse(cachedData) as Post[];
          setCachedPosts(parsedData);
          return true;
        } catch (e) {
          // Handle parsing error
          console.error('Error parsing cached posts:', e);
        }
      }
      return false;
    };
    
    loadFromCache();
  }, []);

  // Update the cache whenever posts change
  useEffect(() => {
    if (cachedPosts.length > 0) {
      localStorage.setItem(POSTS_CACHE_KEY, JSON.stringify(cachedPosts));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().getTime().toString());
    }
  }, [cachedPosts]);

  // Function to invalidate the cache
  const invalidateCache = () => {
    localStorage.removeItem(POSTS_CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  };

  return { cachedPosts, setCachedPosts, invalidateCache, isCacheValid };
}