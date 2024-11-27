// validation.js
export const validateGroup = (groupData) => {
    const errors = {};
  
    if (!groupData.participants || groupData.participants.length < 2) {
      errors.participants = 'At least 2 participants are required';
    }
  
    if (groupData.participants?.length > 20) {
      errors.participants = 'Maximum 20 participants allowed';
    }
  
    groupData.participants?.forEach((participant, index) => {
      if (!participant.name?.trim()) {
        errors[`participant${index}Name`] = 'Name is required';
      }
      if (!participant.email?.trim()) {
        errors[`participant${index}Email`] = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participant.email)) {
        errors[`participant${index}Email`] = 'Invalid email format';
      }
    });
  
    if (!groupData.deadline) {
      errors.deadline = 'Deadline is required';
    } else if (new Date(groupData.deadline) <= new Date()) {
      errors.deadline = 'Deadline must be in the future';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  