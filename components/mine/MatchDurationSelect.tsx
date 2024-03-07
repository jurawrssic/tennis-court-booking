import { GlobalContext } from '@/context/GlobalState';
import { useContext } from 'react';

import { SelectComponent } from '@/components/mine/SelectComponent';

const MatchDurationSelect = () => {
  const {
    selectedMatchDuration,
    availableMatchDurations,
    setSelectedMatchDuration,
  } = useContext(GlobalContext);

  const placeholder = 'Select duration';

  return (
    <div className="select-area__match-duration">
      <label>Duration</label>
      <SelectComponent
        value={selectedMatchDuration}
        options={availableMatchDurations}
        placeholder={placeholder}
        onChange={setSelectedMatchDuration}
      />
    </div>
  );
};

export { MatchDurationSelect };
