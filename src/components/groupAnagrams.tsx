import React, { useState } from 'react';
import { groupAnagrams } from '../algorithms/groupAnagrams';

const GroupAnagramsComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [result, setResult] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Parse the input - assuming comma-separated strings
      const inputArray = inputText.split(',').map(s => s.trim());
      
      // Run the algorithm
      const groupedAnagrams = groupAnagrams(inputArray);
      
      // Update state with result
      setResult(groupedAnagrams);
      setError(null);
    } catch (err) {
      setError('Invalid input. Please enter comma-separated words.');
    }
  };

  return (
    <div className="form-container">
      <h2>Group Anagrams</h2>
      <p>Enter a list of words separated by commas to group anagrams together.</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputArray">Input Words:</label>
          <input
            type="text"
            id="inputArray"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g., cat, tea, tan, ate, nat, bat"
            className="form-control"
          />
        </div>
        
        <button type="submit" className="btn btn-submit">
          Group Anagrams
        </button>
      </form>
      
      {result.length > 0 && (
        <div className="result-container">
          <h3>Result:</h3>
          <div className="anagram-groups">
            {result.map((group, groupIndex) => (
              <div key={groupIndex} className="anagram-group">
                <h4>Group {groupIndex + 1}:</h4>
                <ul>
                  {group.map((word, wordIndex) => (
                    <li key={wordIndex}>{word}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="explanation">
        <h3>How It Works</h3>
        <p>
          This algorithm groups strings that are anagrams of each other. Two strings are anagrams if they
          contain the same characters with the same frequencies (possibly in different orders).
        </p>
        <p>
          <strong>Example:</strong> For input ["cat", "tea", "tan", "ate", "nat", "bat"], the output is:
        </p>
        <code>[["cat", "tea", "ate"], ["tan", "nat"], ["bat"]]</code>
      </div>
    </div>
  );
};

export default GroupAnagramsComponent;