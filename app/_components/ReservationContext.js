'use client';

import { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

const initialState = { from: null, to: null };

const ReservationProvider = ({ children }) => {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return <ReservationContext.Provider value={{ range, setRange, resetRange }}>{children}</ReservationContext.Provider>;
};

const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) throw new Error('Context was used outside provider!');
  return context;
};

export { ReservationProvider, useReservation };
