# Coding Challenges Solution

This repository contains solutions for three coding challenges:

1. JSONPlaceholder API CRUD Application
2. Longest Substring Without Repeating Characters
3. Group Anagrams

## Live Demo

[Link to the live demo](#) (Replace with your deployed application URL)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Challenge 1: JSONPlaceholder API CRUD Application](#challenge-1-jsonplaceholder-api-crud-application)
- [Challenge 2: Longest Substring Without Repeating Characters](#challenge-2-longest-substring-without-repeating-characters)
- [Challenge 3: Group Anagrams](#challenge-3-group-anagrams)
- [Project Structure](#project-structure)
- [Additional Features](#additional-features)

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router
- CSS (custom variables & responsive design)
- JSONPlaceholder API

## Project Setup

### Prerequisites

- Node.js 14+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hennessy19/json_server_crud_test.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Building for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

## Challenge 1: JSONPlaceholder API CRUD Application

A single-page application that interacts with the JSONPlaceholder API to perform CRUD operations.

### Features

- **Create**: Add new posts with title and body
- **Read**: View a list of posts with pagination and view individual post details
- **Update**: Edit existing posts
- **Delete**: Remove posts from the list

### Technical Highlights

- **State Management**: Custom React hooks for managing application state
- **Caching**: Local storage-based caching with expiration to reduce API calls
- **Pagination**: Client-side pagination for better user experience
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Error Handling**: Comprehensive error handling for API requests

## Challenge 2: Longest Substring Without Repeating Characters

An algorithm to find the length of the longest substring without repeating characters.

### Algorithm Approach

- **Sliding Window Technique**: Maintain a window of characters without duplicates
- **Character Mapping**: Track the position of each character to efficiently adjust the window
- **Time Complexity**: O(n) where n is the length of the string
- **Space Complexity**: O(min(m, n)) where m is the size of the character set

### Examples

- `"abcabcbb"` → 3 (for `"abc"`)
- `"bbbbb"` → 1 (for `"b"`)
- `"pwwkew"` → 3 (for `"wke"`)

## Challenge 3: Group Anagrams

An algorithm to group strings that are anagrams of each other.

### Algorithm Approach

- **Character Counting**: Create a unique signature for each word based on character frequencies
- **Hash Map Grouping**: Group words with identical signatures together
- **Time Complexity**: O(n * k) where n is the number of strings and k is the maximum string length
- **Space Complexity**: O(n * k) to store all strings in our hash map

### Examples

Input: `["cat", "tea", "tan", "ate", "nat", "bat"]`  
Output: `[["cat", "tea", "ate"], ["tan", "nat"], ["bat"]]`

## Project Structure

```
src/
├── algorithms/        # Algorithm implementations
├── components/        # React components
├── hooks/             # Custom React hooks
├── services/          # API services
├── types/             # TypeScript interfaces
├── App.css            # Main stylesheet
├── App.tsx            # Main component
└── main.tsx           # Entry point
```

## Additional Features

- **TypeScript Integration**: Type safety throughout the application
- **Comprehensive Testing**: Test cases for all algorithms
- **Clean Code**: Well-documented, maintainable code with consistent style
- **Performance Optimizations**: Efficient implementations for all algorithms
- **Interactive UI**: User-friendly interfaces for testing the algorithms
