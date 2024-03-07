export type AVAILABLE_TIME_SLOTS_ARRAY = Array<{
  label: string;
  hour: number;
  minutes: number;
}>;

export type AVAILABLE_LOCATIONS_ARRAY = Array<{ value: string; label: string }>;

export type AVAILABLE_MATCH_DURATIONS_ARRAY = Array<{
  value: string;
  label: string;
}>;

export type PREVIOUSLY_BOOKED_MATCHES_OBJECT = {
  [key: string]: { date: Date; endTime: Date }[];
};
