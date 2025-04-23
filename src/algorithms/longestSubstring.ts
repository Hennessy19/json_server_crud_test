/**
 * Find the length of the longest substring without repeating characters
 * @param {string} s - The input string
 * @return {number} - The length of the longest substring without repeating characters
 */
export function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) return 0;
  
  // Use sliding window technique with a Map to track character positions
  let maxLength = 0;
  let start = 0;
  const charMap = new Map<string, number>();
  
  // Loop through the string with end pointer
  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];
    
    // If character already exists in our window, move start pointer
    // to position after the last occurrence of the character
    if (charMap.has(currentChar) && charMap.get(currentChar)! >= start) {
      start = charMap.get(currentChar)! + 1;
    }
    
    // Update character position in the map
    charMap.set(currentChar, end);
    
    // Update max length
    maxLength = Math.max(maxLength, end - start + 1);
  }
  
  return maxLength;
}

export default lengthOfLongestSubstring;