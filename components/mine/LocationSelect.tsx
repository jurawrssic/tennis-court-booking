import { useGlobalContext } from '@/context/GlobalState';
import { SelectComponent } from '@/components/mine/SelectComponent';

const LocationSelect = () => {
  const { selectedLocation, availableLocations, setSelectedLocation } =
    useGlobalContext();

  const placeholder = 'Pick a location';

  return (
    <div className="select-area__location">
      <label>Location</label>
      <SelectComponent
        value={selectedLocation}
        options={availableLocations}
        placeholder={placeholder}
        onChange={setSelectedLocation}
      />
    </div>
  );
};

export { LocationSelect };
