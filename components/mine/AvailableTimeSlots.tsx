'use client';

import { GlobalContext } from '@/context/GlobalState';
import { useContext } from 'react';

import { Button } from '@/components/ui/button';

const AvailableTimeSlots = () => {
  const { selectedDay, availableTimeSlots } = useContext(GlobalContext);

  const displaySelectedDay = () =>
    selectedDay?.toLocaleString('en', {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
    });

  const selectTime = (hour: number, minutes: number) => {
    console.log('TODO: select time');
  };

  return (
    <section className="available-time-slots">
      {selectedDay && `${displaySelectedDay()}`}

      {selectedDay &&
        availableTimeSlots.map(({ label, hour, minutes }) => (
          <Button key={label} onClick={() => selectTime(hour, minutes)}>
            {label}
          </Button>
        ))}
    </section>
  );
};

export { AvailableTimeSlots };
