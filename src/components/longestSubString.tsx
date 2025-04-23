import React, { useState } from 'react';
import { lengthOfLongestSubstring } from '../algorithms/longestSubstring';

const LongestSubstring: React.FC = () => {
  const [inputString, setInputString] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const length = lengthOfLongestSubstring(inputString);
    setResult(length);
  };

  return (
    <div className="form-container">
      <h2>Longest Substring Without Repeating Characters</h2>
      <p>Enter a string to find the length of the longest substring without repeating characters.</p>
      
      <div className="form-group">
        <label htmlFor="inputString">Enter a string:</label>
        <input
          type="text"
          id="inputString"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
          placeholder="e.g., abcabcbb"
          className="form-control"
        />
      </div>
      
      <button className="btn btn-submit" onClick={handleCalculate}>
        Calculate
      </button>
      
      {result !== null && (
        <div className="result-container">
          <h3>Result: {result}</h3>
          <p>The length of the longest substring without repeating characters is {result}.</p>
        </div>
      )}
      
      <div className="explanation">
        <h3>How It Works</h3>
        <p>
          This algorithm finds the length of the longest substring without repeating characters.
          It uses a sliding window approach to efficiently track the current substring.
        </p>
        <p>
          <strong>Examples:</strong>
        </p>
        <ul>
          <li>"abcabcbb" → 3 (for "abc")</li>
          <li>"bbbbb" → 1 (for "b")</li>
          <li>"pwwkew" → 3 (for "wke")</li>
        </ul>
      </div>
    </div>
  );
};

export default LongestSubstring;