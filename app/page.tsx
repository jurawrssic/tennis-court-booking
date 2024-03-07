'use client';

import 'react-day-picker/dist/style.css';

import { GlobalProvider } from '@/context/GlobalState';

import { DayPicker } from '@/components/mine/DayPicker';
import { AvailableTimeSlots } from '@/components/mine/AvailableTimeSlots';
import { LocationSelect } from '@/components/mine/LocationSelect';
import { MatchDurationSelect } from '@/components/mine/MatchDurationSelect';

const HomePage = () => {
  return (
    <GlobalProvider>
      <div className="container">
        <section className="select-area">
          <h1>Book a Court</h1>
          <LocationSelect />
          <MatchDurationSelect />
        </section>

        <DayPicker />

        <AvailableTimeSlots />
      </div>
    </GlobalProvider>
  );
};

export default HomePage;
