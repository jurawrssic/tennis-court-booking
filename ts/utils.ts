import type { RESERVATIONS_ARRAY, SINGLE_RESERVATION_OBJECT } from './types';

const OPENING_HOURS = {
  openingTime: { hour: 8, minutes: 0 },
  closingTime: { hour: 18, minutes: 0 },
};

const getDayMonthAndYear = (date: Date) => {
  const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ];

  return { day, month, year };
};

const getSameDayReservations = (
  bookedReservation: SINGLE_RESERVATION_OBJECT,
  selectedDay: Date
) => {
  const reservationDate = getDayMonthAndYear(bookedReservation.date);
  const currentlySelectedDate = getDayMonthAndYear(selectedDay);

  return (
    currentlySelectedDate.day === reservationDate.day &&
    currentlySelectedDate.month === reservationDate.month &&
    currentlySelectedDate.year === reservationDate.year
  );
};

const filterReservationsByDate = (
  selectedDay: Date,
  alreadyBookedReservations: RESERVATIONS_ARRAY
) => {
  if (!selectedDay) return;

  const filteredReservations = alreadyBookedReservations.filter((reservation) =>
    getSameDayReservations(reservation, selectedDay)
  );

  return filteredReservations;
};

const isDuringOpeningHours = (
  newReservationStartTime: Date,
  newReservationEndTime: Date
) => {
  const { openingTime, closingTime } = OPENING_HOURS;

  const isAfterOpening = newReservationStartTime.getHours() >= openingTime.hour;
  const endsBeforeClosing = newReservationEndTime.getHours() < closingTime.hour;

  const endsAtClosingTime =
    newReservationEndTime.getHours() === closingTime.hour &&
    newReservationEndTime.getMinutes() === closingTime.minutes;

  return isAfterOpening && (endsBeforeClosing || endsAtClosingTime);
};

const partiallyOverlapsAnotherMatch = (
  newReservationStartTime: Date,
  currentReservationStartTime: Date,
  currentReservationEndTime: Date
) => {
  return (
    newReservationStartTime >= currentReservationStartTime &&
    newReservationStartTime < currentReservationEndTime
  );
};

const endsDuringAnotherMatch = (
  newReservationEndTime: Date,
  currentReservationStartTime: Date,
  currentReservationEndTime: Date
) => {
  return (
    newReservationEndTime > currentReservationStartTime &&
    newReservationEndTime <= currentReservationEndTime
  );
};

const startsBeforeAndEndsAfterAnotherMatch = (
  newReservationStartTime: Date,
  currentReservationStartTime: Date,
  newReservationEndTime: Date,
  currentReservationEndTime: Date
) => {
  return (
    newReservationStartTime < currentReservationStartTime &&
    newReservationEndTime > currentReservationEndTime
  );
};

const isContainedWithinAnotherMatch = (
  newReservationStartTime: Date,
  currentReservationStartTime: Date,
  newReservationEndTime: Date,
  currentReservationEndTime: Date
) => {
  return (
    newReservationStartTime >= currentReservationStartTime &&
    newReservationEndTime <= currentReservationEndTime
  );
};

const startsInThePast = (newReservationStartTime: Date) => {
  const currentDate = new Date();
  return currentDate > newReservationStartTime;
};

const newReservationHasTimeConflicts = (
  newReservationStartTime: Date,
  currentReservationStartTime: Date,
  newReservationEndTime: Date,
  currentReservationEndTime: Date
) => {
  return (
    partiallyOverlapsAnotherMatch(
      newReservationStartTime,
      currentReservationStartTime,
      currentReservationEndTime
    ) ||
    endsDuringAnotherMatch(
      newReservationEndTime,
      currentReservationStartTime,
      currentReservationEndTime
    ) ||
    startsBeforeAndEndsAfterAnotherMatch(
      newReservationStartTime,
      currentReservationStartTime,
      newReservationEndTime,
      currentReservationEndTime
    ) ||
    isContainedWithinAnotherMatch(
      newReservationStartTime,
      currentReservationStartTime,
      newReservationEndTime,
      currentReservationEndTime
    )
  );
};

const getReservationEndTime = (
  newReservationEndTime: Date,
  newReservationDuration: string
) => {
  return newReservationEndTime.setMinutes(
    newReservationEndTime.getMinutes() + parseInt(newReservationDuration)
  );
};

const isTimeSlotAvailable = (
  selectedDay: Date,
  previouslyBookedMatches: RESERVATIONS_ARRAY,
  newReservationStartTime: Date,
  newReservationDuration: string
) => {
  let newReservationEndTime = new Date(newReservationStartTime);

  newReservationEndTime.setMinutes(
    newReservationEndTime.getMinutes() + parseInt(newReservationDuration)
  );

  const reservations = filterReservationsByDate(
    selectedDay,
    previouslyBookedMatches
  );

  if (
    startsInThePast(newReservationStartTime) ||
    !isDuringOpeningHours(newReservationStartTime, newReservationEndTime)
  )
    return false;

  if (!reservations?.length) return true;

  for (const reservation of reservations) {
    const currentReservationStartTime = reservation.date;
    const currentReservationEndTime = reservation.endTime;

    newReservationEndTime = new Date(newReservationStartTime);

    newReservationEndTime.setMinutes(
      newReservationEndTime.getMinutes() + parseInt(newReservationDuration)
    );

    if (
      newReservationHasTimeConflicts(
        newReservationStartTime,
        currentReservationStartTime,
        newReservationEndTime,
        currentReservationEndTime
      )
    )
      return false;
  }

  return true;
};

const formatTime = (time: Date) =>
  time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const setDatesToOpeningHours = (selectedDay: Date) => {
  const { openingTime, closingTime } = OPENING_HOURS;
  const [currentIterationTime, closingTimeDate] = [
    new Date(selectedDay).setHours(openingTime.hour, 0, 0, 0),
    new Date(selectedDay).setHours(closingTime.hour, 0, 0, 0),
  ];

  return {
    currentIterationTime: new Date(currentIterationTime),
    closingTimeDate: new Date(closingTimeDate),
  };
};

const getAvailableTimeSlots = (
  selectedDay: Date,
  selectedMatchDuration: string,
  previouslyBookedMatches: RESERVATIONS_ARRAY,
  setAvailableTimeSlots: Function
) => {
  const { currentIterationTime, closingTimeDate } =
    setDatesToOpeningHours(selectedDay);

  const availableTimeSlots = [];

  while (currentIterationTime < closingTimeDate) {
    if (
      isTimeSlotAvailable(
        selectedDay,
        previouslyBookedMatches,
        currentIterationTime,
        selectedMatchDuration
      )
    ) {
      const newAvailableTimeSlot = {
        label: formatTime(currentIterationTime),
        hour: currentIterationTime.getHours(),
        minutes: currentIterationTime.getMinutes(),
      };

      availableTimeSlots.push(newAvailableTimeSlot);
    }

    currentIterationTime.setMinutes(currentIterationTime.getMinutes() + 30);
  }

  setAvailableTimeSlots(availableTimeSlots);
};

const displaySelectedDay = (date: Date) => {
  if (date)
    return date.toLocaleString('en', {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
    });
};

export { getAvailableTimeSlots, displaySelectedDay };
