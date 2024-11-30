class MatchingService {
  /**
   * Generates valid matches for Secret Santa participants respecting restrictions
   * @param {Array} participants - Array of participant objects
   * @param {Array} restrictions - Array of restriction objects
   * @returns {Map} Map of participant IDs to their assigned match IDs
   */
  static generateMatches(participants, restrictions) {
    const participantIds = participants.map(p => p.id);
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      const matches = new Map();
      const available = [...participantIds];
      let valid = true;

      // Shuffle available participants
      for (let i = available.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [available[i], available[j]] = [available[j], available[i]];
      }

      // Attempt to assign matches
      for (const participant of participantIds) {
        const validMatches = available.filter(match => 
          participant !== match && 
          !this.hasRestriction(participant, match, restrictions)
        );

        if (validMatches.length === 0) {
          valid = false;
          break;
        }

        const matchIndex = Math.floor(Math.random() * validMatches.length);
        const match = validMatches[matchIndex];
        matches.set(participant, match);
        available.splice(available.indexOf(match), 1);
      }

      if (valid) {
        return matches;
      }

      attempts++;
    }

    throw new Error('Unable to generate valid matches after maximum attempts');
  }

  /**
   * Checks if there's a restriction between two participants
   */
  static hasRestriction(participant1, participant2, restrictions) {
    return restrictions.some(r =>
      (r.participant1 === participant1 && r.participant2 === participant2) ||
      (r.participant1 === participant2 && r.participant2 === participant1)
    );
  }

  /**
   * Validates a matching solution
   */
  static validateMatching(matches, participants, restrictions) {
    const participantIds = new Set(participants.map(p => p.id));
    const assigned = new Set();

    // Check that all participants are matched
    if (matches.size !== participants.length) return false;

    // Validate each match
    for (const [giver, receiver] of matches) {
      // Check that both participants exist
      if (!participantIds.has(giver) || !participantIds.has(receiver)) return false;

      // Check for self-assignment
      if (giver === receiver) return false;

      // Check for restrictions
      if (this.hasRestriction(giver, receiver, restrictions)) return false;

      // Check for duplicate receivers
      if (assigned.has(receiver)) return false;
      assigned.add(receiver);
    }

    return true;
  }
}

export { MatchingService };