import { useGlobalContext } from '@/context/GlobalState';
import { useState } from 'react';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ConfirmationDialog } from './ConfirmationDialog';

import { displaySelectedDay } from '@/ts/utils';

const AvailableTimeSlots = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(false);
  const { selectedDay, availableTimeSlots, setSelectedDay } =
    useGlobalContext();

  const setMatchStartTime = (hour: number, minutes: number) => {
    const newDateInstance = new Date(selectedDay);
    const updatedMatchDate = new Date(
      newDateInstance.setHours(hour, minutes, 0)
    );

    setSelectedDay(updatedMatchDate);
    setOpenDialog(true);
  };

  const handleDialog = (value: boolean) => {
    if (confirmedReservation) {
      setConfirmedReservation(false);
    }

    setOpenDialog(value);
  };

  return (
    <section className="available-time-slots">
      <Dialog open={openDialog} onOpenChange={handleDialog}>
        <p>{selectedDay && `${displaySelectedDay(selectedDay)}`}</p>

        {selectedDay && !availableTimeSlots.length && (
          <p>No available time slots</p>
        )}

        {selectedDay &&
          availableTimeSlots.map(({ label, hour, minutes }) => (
            <DialogTrigger
              key={label}
              onClick={() => setMatchStartTime(hour, minutes)}
            >
              {label}
            </DialogTrigger>
          ))}

        <ConfirmationDialog
          confirmedReservation={confirmedReservation}
          setConfirmedReservation={setConfirmedReservation}
        />
      </Dialog>
    </section>
  );
};

export { AvailableTimeSlots };
