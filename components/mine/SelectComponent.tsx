import { GlobalContext } from '@/context/GlobalState';
import { useContext, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SELECT_OPTIONS_ARRAY } from '@/ts/types';
import { getAvailableTimeSlots } from '@/ts/utils';

const SelectComponent = ({
  value,
  options,
  placeholder,
  onChange,
}: {
  value: string;
  options: SELECT_OPTIONS_ARRAY;
  placeholder: string;
  onChange: Function;
}) => {
  const {
    selectedLocation,
    selectedMatchDuration,
    selectedDay,
    filteredMatches,
    setAvailableTimeSlots,
    getBookedMatchesPerLocation,
    toggleDayPicker,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (selectedLocation && selectedMatchDuration) {
      toggleDayPicker(false);
      getBookedMatchesPerLocation();
    }

    if (selectedLocation && selectedMatchDuration && selectedDay)
      getAvailableTimeSlots(
        selectedDay,
        selectedMatchDuration,
        filteredMatches,
        setAvailableTimeSlots
      );
  }, [selectedLocation, selectedMatchDuration, selectedDay]);

  return (
    <Select onValueChange={(value) => onChange(value)} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SelectComponent };
