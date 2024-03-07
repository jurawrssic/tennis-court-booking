import { GlobalContext } from '@/context/GlobalState';
import { useContext, useEffect } from 'react';

import { Calendar } from '@/components/ui/calendar';
import { getAvailableTimeSlots } from '@/ts/utils';

import '@/styles/daypicker.css';

const DayPicker = () => {
  const {
    selectedMatchDuration,
    selectedDay,
    disableDayPicker,
    filteredMatches,
    setSelectedDay,
    setAvailableTimeSlots,
  } = useContext(GlobalContext);

  useEffect(() => {
    getAvailableTimeSlots(
      selectedDay,
      selectedMatchDuration,
      filteredMatches,
      setAvailableTimeSlots
    );
  }, [selectedDay]);

  return (
    <section className="daypicker-area">
      <h2>Pick a date and time</h2>
      <Calendar
        onDayClick={setSelectedDay}
        selected={selectedDay}
        className="daypicker-area__calendar"
        disabled={[{ before: new Date() }, disableDayPicker]}
      />
    </section>
  );
};

export { DayPicker };
