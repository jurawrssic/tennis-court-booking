export type SINGLE_RESERVATION_OBJECT = {
  date: Date;
  endTime: Date;
};

export type RESERVATIONS_ARRAY = Array<SINGLE_RESERVATION_OBJECT>;

export type SELECT_OPTIONS_ARRAY = Array<{
  value: string;
  label: string;
}>;
