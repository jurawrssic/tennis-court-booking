import { useGlobalContext } from '@/context/GlobalState';
import { Calendar } from '@/components/ui/calendar';

import '@/styles/daypicker.css';

const DayPicker = () => {
  const { selectedDay, disableDayPicker, setSelectedDay } = useGlobalContext();

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
