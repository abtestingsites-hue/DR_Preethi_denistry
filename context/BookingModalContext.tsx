"use client";

import React, { createContext, useContext, useState } from "react";

interface BookingModalContextType {
  isOpen: boolean;
  preselectedTreatment: string;
  openBookingModal: (treatment?: string) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType>({
  isOpen: false,
  preselectedTreatment: "",
  openBookingModal: () => {},
  closeBookingModal: () => {},
});

export const BookingModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState("");

  const openBookingModal = (treatment?: string) => {
    setPreselectedTreatment(treatment || "Invisalign & Clear Aligners");
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
  };

  return (
    <BookingModalContext.Provider
      value={{
        isOpen,
        preselectedTreatment,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = () => useContext(BookingModalContext);
