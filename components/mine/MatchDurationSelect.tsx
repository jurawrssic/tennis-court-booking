import { useGlobalContext } from '@/context/GlobalState';
import { SelectComponent } from '@/components/mine/SelectComponent';

const MatchDurationSelect = () => {
  const {
    selectedMatchDuration,
    availableMatchDurations,
    setSelectedMatchDuration,
  } = useGlobalContext();

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
