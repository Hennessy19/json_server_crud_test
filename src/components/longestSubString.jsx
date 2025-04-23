import React, { useState } from 'react';
import { lengthOfLongestSubstring } from '../algorithms/longestSubstring';

const LongestSubstring = () => {
  const [inputString, setInputString] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const length = lengthOfLongestSubstring(inputString);
    setResult(length);
  };

  return (
    <div className="form-container">
      <h2>Longest Substring Without Repeating Characters</h2>
      <div className="form-group">
        <label htmlFor="inputString">Enter a string:</label>
        <input
          type="text"
          id="inputString"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
          placeholder="e.g., abcabcbb"
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
    </div>
  );
};

export default LongestSubstring;