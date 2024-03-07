export default (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case 'SET_SELECTED_LOCATION':
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case 'SET_SELECTED_MATCH_DURATION':
      return {
        ...state,
        selectedMatchDuration: action.payload,
      };
    case 'SET_SELECTED_DAY':
      return {
        ...state,
        selectedDay: action.payload,
      };
    case 'DISABLE_DAY_PICKER':
      return {
        ...state,
        disableDayPicker: action.payload,
      };
    case 'SET_EMPTY_TIME_SLOTS':
      return {
        ...state,
        availableTimeSlots: action.payload,
      };
    case 'GET_BOOKED_MATCHES_PER_SELECTED_LOCATION':
      return {
        ...state,
        filteredMatches: state.previouslyBookedMatches[action.payload],
      };
    case 'ADD_NEW_RESERVATION':
      return {
        ...state,
        previouslyBookedMatches: {
          ...state.previouslyBookedMatches,
          [state.selectedLocation]: [
            ...(state.previouslyBookedMatches[state.selectedLocation] || []),
            action.payload,
          ],
        },
      };
    default:
      return state;
  }
};
