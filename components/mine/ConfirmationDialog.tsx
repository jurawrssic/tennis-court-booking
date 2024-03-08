import { useGlobalContext } from '@/context/GlobalState';

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
  capitalizeText,
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
    addNewReservation,
    getBookedMatchesPerLocation,
  } = useGlobalContext();

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

  const confirmReservationDialog = () => {
    return (
      <>
        <DialogHeader>
          <DialogTitle className="text-center">
            Please confirm your reservation.
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
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
          {`Location: ${capitalizeText(selectedLocation)}`}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="cancel-button">
              Cancel
            </Button>
          </DialogClose>

          <Button
            className="accent-button"
            type="button"
            variant="default"
            onClick={handleConfirmation}
            disabled={confirmedReservation}
          >
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
            You will receive an email shortly with your reservation details.
          </span>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="cancel-button">
              Close
            </Button>
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
