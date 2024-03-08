This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First you'll need to make sure you have a more updated version of Node

``node -v``

I recommend using v21 since it's the one I developed and know doesn't have any issues with the application -- for context, I'm running everything on Ubuntu. You can install this version of Node.js using nvm.

```bash
nvm install v21

nvm use v21
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Checkout the live demo
[Live demo](https://tennis-court-booking-two.vercel.app/) on Vercel

## Assumptions made during the development of the project

- Disabled all past days on the calendar so the user can't book the court on a day that has already passed, and also prevents them from booking at an hour that has already passed;
- We also shouldn't display time slots outside of working court hours, assuming that opening is at 8am and closing is at 6pm, but that can be changed since there's a constant for that;
- Matches shouldn't conflict in time, partially or completely overlap each other, this is where I spent the most time;
- Anticipate there will be many court locations and match durations. The app should be able to handle any number of court locations and match durations, as long as they adhere to the existing patterns.
- Responsive design was implemented based on what was deemed most appropriate, as specific design for smaller screens was not provided.

## Features I thought about but didn't have the time to code
Since I didn't have much time, my primary focus was on delivering the main feature with clean, maintainable, and high-quality code. Here are a few features I considered but didn't have time to implement:

- Wanted to have more validation; the application flow is structured in a way so that the user can't make mistakes like trying to book without a location, etc., but additional validation would enhance the user experience and help prevent unexpected errors;
- Error handling; while the application seems robust with the preventive measures already in place, further error handling wouldn't hurt;
- Wanted to have tests in place with Jest and Cypress;
- Would definitely add internationalization to eliminate hardcoded text;
- If I were to start development anew, I would opt for a third-party library like date-fns to streamline date handling, given the challenges posed by the JavaScript date API;
- I would disable days that are fully booked and highlight days when the user has a booking, as implied by the screenshot provided for the design -- this seems to be the most intricate part of the development and would take me long hours to get right;
- Would send confirmation emails upon booking;
- Maybe make it a fullstack with an API developed using Next.js.

## Additional Information
So we don't get confused when trying out the app, here are the currently booked dates and times, they're all the same across locations

March 08 from 10:30am to 12:00pm
March 08 from 13:30pm to 14:00pm
March 08 from 14:00pm to 16:00pm

March 09 from 10:30am to 12:00pm
March 09 from 13:30pm to 14:00pm
March 09 from 14:00pm to 16:00pm

March 15 from 10:30am to 12:00pm
March 15 from 13:30pm to 14:00pm
March 15 from 14:00pm to 16:00pm

March 24 from 10:30am to 12:00pm
March 24 from 13:30pm to 14:00pm
March 24 from 14:00pm to 16:00pm
