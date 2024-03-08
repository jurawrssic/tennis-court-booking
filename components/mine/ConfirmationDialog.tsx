import { GlobalContext } from '@/context/GlobalState';
import { useContext, useEffect } from 'react';

import {
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import {
  formatTime,
  getReservationEndTime,
  displaySelectedDay,
  getAvailableTimeSlots,
} from '@/ts/utils';

const ConfirmationDialog = ({
  confirmedReservation,
  setConfirmedReservation,
}: {
  confirmedReservation: boolean;
  setConfirmedReservation: Function;
}) => {
  const {
    selectedLocation,
    selectedMatchDuration,
    selectedDay,
    filteredMatches,
    previouslyBookedMatches,
    addNewReservation,
    setAvailableTimeSlots,
    getBookedMatchesPerLocation,
  } = useContext(GlobalContext);

  const getNewReservationObject = () => {
    return {
      date: selectedDay,
      endTime: getReservationEndTime(selectedDay, selectedMatchDuration),
    };
  };

  const handleConfirmation = () => {
    //TODO: add new reservation validation
    const newReservation = getNewReservationObject();
    addNewReservation(newReservation);

    getBookedMatchesPerLocation();
    setConfirmedReservation(true);
  };

  useEffect(() => {
    if (confirmedReservation)
      getAvailableTimeSlots(
        selectedDay,
        selectedMatchDuration,
        filteredMatches,
        setAvailableTimeSlots
      );
  }, [previouslyBookedMatches[selectedLocation]]);

  const confirmReservationDialog = () => {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Please confirm your reservation.</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Review your reservation details:
          <br />
          {`Date: ${displaySelectedDay(selectedDay)}`}
          <br />
          {`From: ${selectedDay && formatTime(selectedDay)}`}
          <br />
          {`Until: ${formatTime(
            getReservationEndTime(selectedDay, selectedMatchDuration)
          )}`}
          <br />
          {`Location: ${selectedLocation}`}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <Button type="button" variant="default" onClick={handleConfirmation}>
            Confirm
          </Button>
        </DialogFooter>
      </>
    );
  };

  const confirmedReservationDialog = () => {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Thank you!</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <span>
            You'll receive an email shortly with your reservation details.
          </span>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </>
    );
  };

  return (
    <DialogContent>
      {confirmedReservation
        ? confirmedReservationDialog()
        : confirmReservationDialog()}
    </DialogContent>
  );
};

export { ConfirmationDialog };
