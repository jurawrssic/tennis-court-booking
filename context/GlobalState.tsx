import React, {
  ReactNode,
  createContext,
  useReducer,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';

import AppReducer from './AppReducer';

import type {
  AVAILABLE_TIME_SLOTS_ARRAY,
  AVAILABLE_LOCATIONS_ARRAY,
  AVAILABLE_MATCH_DURATIONS_ARRAY,
  PREVIOUSLY_BOOKED_MATCHES_OBJECT,
} from './types';

import type {
  SINGLE_RESERVATION_OBJECT,
  RESERVATIONS_ARRAY,
} from '../ts/types';

import { getAvailableTimeSlots } from '@/ts/utils';

type State = {
  selectedLocation: string;
  selectedMatchDuration: string;
  selectedDay: Date;
  disableDayPicker: boolean;
  availableTimeSlots: AVAILABLE_TIME_SLOTS_ARRAY;
  availableLocations: AVAILABLE_LOCATIONS_ARRAY;
  availableMatchDurations: AVAILABLE_MATCH_DURATIONS_ARRAY;
  filteredMatches: RESERVATIONS_ARRAY;
  previouslyBookedMatches: PREVIOUSLY_BOOKED_MATCHES_OBJECT;
};

const initialState = {
  selectedLocation: '',
  selectedMatchDuration: '',
  selectedDay: null,
  disableDayPicker: true,
  availableTimeSlots: [],
  availableLocations: [
    { value: 'brazil', label: 'Brazil' },
    { value: 'lisbon', label: 'Lisbon' },
    { value: 'singapore', label: 'Singapore' },
  ],
  availableMatchDurations: [
    { value: '30', label: '30 min' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1 hour 30 min' },
    { value: '120', label: '2 hours' },
  ],
  filteredMatches: [],
  previouslyBookedMatches: {
    brazil: [
      {
        date: new Date('2024-03-08T10:30:00'),
        endTime: new Date('2024-03-08T12:00:00'),
      },
      {
        date: new Date('2024-03-08T13:30:00'),
        endTime: new Date('2024-03-08T14:00:00'),
      },
    ],
    lisbon: [
      {
        date: new Date('2024-03-08T10:30:00'),
        endTime: new Date('2024-03-08T12:00:00'),
      },
      {
        date: new Date('2024-03-08T13:30:00'),
        endTime: new Date('2024-03-08T14:00:00'),
      },
    ],
    singapore: [
      {
        date: new Date('2024-03-07T10:30:00'),
        endTime: new Date('2024-03-07T12:00:00'),
      },
      {
        date: new Date('2024-03-07T13:30:00'),
        endTime: new Date('2024-03-07T14:00:00'),
      },
    ],
  },
};

type ContextType = State & {
  setSelectedLocation: Dispatch<SetStateAction<string>>;
  setSelectedMatchDuration: Dispatch<SetStateAction<string>>;
  setSelectedDay: Dispatch<SetStateAction<Date | null>>;
  setAvailableTimeSlots: Dispatch<SetStateAction<AVAILABLE_TIME_SLOTS_ARRAY>>;
  toggleDayPicker: Dispatch<SetStateAction<boolean>>;
  getBookedMatchesPerLocation: Dispatch<void>;
  addNewReservation: Dispatch<SetStateAction<SINGLE_RESERVATION_OBJECT>>;
};

export const GlobalContext = createContext<ContextType>({} as ContextType);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setSelectedLocation = (location: string) => {
    dispatch({ type: 'SET_SELECTED_LOCATION', payload: location });
  };

  const setSelectedMatchDuration = (matchDuration: string) => {
    dispatch({ type: 'SET_SELECTED_MATCH_DURATION', payload: matchDuration });
  };

  const setSelectedDay = (day: Date | null) => {
    dispatch({ type: 'SET_SELECTED_DAY', payload: day });
  };

  const setAvailableTimeSlots = (
    availableTimeSlots: AVAILABLE_TIME_SLOTS_ARRAY
  ) => {
    dispatch({ type: 'SET_EMPTY_TIME_SLOTS', payload: availableTimeSlots });
  };

  const toggleDayPicker = (disableDayPicker: boolean) => {
    dispatch({ type: 'DISABLE_DAY_PICKER', payload: disableDayPicker });
  };

  const getBookedMatchesPerLocation = () => {
    if (state.selectedLocation) {
      dispatch({
        type: 'GET_BOOKED_MATCHES_PER_SELECTED_LOCATION',
        payload: state.selectedLocation,
      });
    }
  };

  const addNewReservation = (newReservation: SINGLE_RESERVATION_OBJECT) => {
    if (state.selectedLocation) {
      dispatch({
        type: 'ADD_NEW_RESERVATION',
        payload: newReservation,
      });
    }
  };

  const shouldEnableDayPickerAndFilterMatchesPerSelectedLocation = () =>
    state.selectedLocation && state.selectedMatchDuration;

  const shouldGetAvailableTimeSlots = () =>
    state.selectedLocation && state.selectedMatchDuration && state.selectedDay;

  useEffect(() => {
    const availableTimeSlots = getAvailableTimeSlots(
      state.selectedDay,
      state.selectedMatchDuration,
      state.filteredMatches
    );

    setAvailableTimeSlots(availableTimeSlots);
  }, [state.previouslyBookedMatches[state.selectedLocation]]);

  useEffect(() => {
    const availableTimeSlots = getAvailableTimeSlots(
      state.selectedDay,
      state.selectedMatchDuration,
      state.filteredMatches
    );

    setAvailableTimeSlots(availableTimeSlots);
  }, [state.selectedDay]);

  useEffect(() => {
    if (shouldEnableDayPickerAndFilterMatchesPerSelectedLocation()) {
      toggleDayPicker(false);
      getBookedMatchesPerLocation();
    }
  }, [state.selectedLocation, state.selectedMatchDuration]);

  useEffect(() => {
    if (shouldGetAvailableTimeSlots()) {
      const availableTimeSlots = getAvailableTimeSlots(
        state.selectedDay,
        state.selectedMatchDuration,
        state.filteredMatches
      );

      setAvailableTimeSlots(availableTimeSlots);
    }
  }, [state.selectedLocation, state.selectedMatchDuration, state.selectedDay]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setSelectedLocation,
        setSelectedMatchDuration,
        setSelectedDay,
        toggleDayPicker,
        setAvailableTimeSlots,
        getBookedMatchesPerLocation,
        addNewReservation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): ContextType => useContext(GlobalContext);
