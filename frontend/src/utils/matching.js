// src/utils/matching.js
export class MatchingService {
    /**
     * Generates Secret Santa assignments while respecting restrictions
     * Uses a modified version of the Fisher-Yates shuffle with backtracking
     * @param {Array} participants - Array of participant objects
     * @param {Array} restrictions - Array of restriction objects
     * @returns {Object} - Map of giver ID to receiver ID
     */
    static generateMatches(participants, restrictions) {
      // Convert participants to array of IDs
      const participantIds = participants.map(p => p.id);
      
      // Create adjacency matrix for valid matches
      const validMatches = this.createValidMatchesMatrix(participantIds, restrictions);
      
      // Try to find a valid matching
      let attempts = 0;
      const maxAttempts = 100; // Prevent infinite loops
      
      while (attempts < maxAttempts) {
        try {
          const matching = this.attemptMatching(participantIds, validMatches);
          return matching;
        } catch (error) {
          attempts++;
          // If we've tried too many times, throw an error
          if (attempts === maxAttempts) {
            throw new Error('Unable to generate valid matching with given restrictions');
          }
        }
      }
    }
  
    /**
     * Creates a matrix of valid matches considering restrictions
     */
    static createValidMatchesMatrix(participantIds, restrictions) {
      const n = participantIds.length;
      const matrix = Array(n).fill().map(() => Array(n).fill(true));
      
      // No self-matches
      for (let i = 0; i < n; i++) {
        matrix[i][i] = false;
      }
      
      // Apply restrictions
      restrictions.forEach(restriction => {
        const i = participantIds.indexOf(restriction.participant1);
        const j = participantIds.indexOf(restriction.participant2);
        if (i !== -1 && j !== -1) {
          matrix[i][j] = false;
          matrix[j][i] = false;
        }
      });
      
      return matrix;
    }
  
    /**
     * Attempts to create a valid matching using a modified Fisher-Yates shuffle
     */
    static attemptMatching(participantIds, validMatches) {
      const n = participantIds.length;
      const assigned = new Set();
      const matching = new Map();
      
      // Create array of available receivers for each giver
      const available = participantIds.map((_, i) => 
        participantIds.filter((_, j) => validMatches[i][j])
      );
      
      // For each giver, try to find a valid receiver
      for (let giverIndex = 0; giverIndex < n; giverIndex++) {
        const giver = participantIds[giverIndex];
        const possibleReceivers = available[giverIndex].filter(r => !assigned.has(r));
        
        if (possibleReceivers.length === 0) {
          throw new Error('No valid receiver found');
        }
        
        // Randomly select a receiver from available options
        const receiverIndex = Math.floor(Math.random() * possibleReceivers.length);
        const receiver = possibleReceivers[receiverIndex];
        
        matching.set(giver, receiver);
        assigned.add(receiver);
      }
      
      return matching;
    }
  
    /**
     * Validates that a matching is valid
     */
    static validateMatching(matching, participants, restrictions) {
      const participantIds = participants.map(p => p.id);
      const assigned = new Set();
      
      // Check that each person gives and receives exactly once
      for (const [giver, receiver] of matching.entries()) {
        // Check that giver and receiver are valid participants
        if (!participantIds.includes(giver) || !participantIds.includes(receiver)) {
          return false;
        }
        
        // Check that no one gives to themselves
        if (giver === receiver) {
          return false;
        }
        
        // Check that no one receives multiple gifts
        if (assigned.has(receiver)) {
          return false;
        }
        assigned.add(receiver);
        
        // Check that no restrictions are violated
        for (const restriction of restrictions) {
          if ((restriction.participant1 === giver && restriction.participant2 === receiver) ||
              (restriction.participant2 === giver && restriction.participant1 === receiver)) {
            return false;
          }
        }
      }
      
      return true;
    }
  }