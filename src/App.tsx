// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import LongestSubstring from './components/LongestSubstring';
import GroupAnagrams from './components/GroupAnagrams';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Posts</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create New Post</Link>
            <Link to="/longest-substring">Longest Substring</Link>
            <Link to="/group-anagrams">Group Anagrams</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/longest-substring" element={<LongestSubstring />} />
            <Route path="/group-anagrams" element={<GroupAnagrams />} />
          </Routes>
        </main>
        <footer>
          <p>And that's a wrap!!</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;