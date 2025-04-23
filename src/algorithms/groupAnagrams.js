/**
 * Group an array of strings into anagrams
 * @param {string[]} strs - Array of strings to group
 * @return {string[][]} - Array of arrays, where each inner array contains strings that are anagrams of each other
 */
export function groupAnagrams(strs) {
    const anagramMap = new Map();
    
    // Use character counting method for better performance
    for (const str of strs) {
      // Create a character count array for lowercase English letters
      const count = new Array(26).fill(0);
      
      // Count each character
      for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i) - 'a'.charCodeAt(0);
        count[charCode]++;
      }
      
      // Use the count array as a key
      const key = count.join('#');
      
      if (anagramMap.has(key)) {
        anagramMap.get(key).push(str);
      } else {
        anagramMap.set(key, [str]);
      }
    }
    
    return Array.from(anagramMap.values());
  }
  
  export default groupAnagrams;