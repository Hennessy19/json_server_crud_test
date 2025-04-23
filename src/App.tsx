import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/createPost';
import EditPost from './components/editPost';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Posts Manager</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create New Post</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </main>
        <footer>
          <p>JSONPlaceholder API CRUD Application</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
