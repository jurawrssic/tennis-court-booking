import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SELECT_OPTIONS_ARRAY } from '@/ts/types';

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
